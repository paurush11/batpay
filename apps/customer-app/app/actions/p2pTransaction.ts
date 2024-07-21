"use server"
import db from "@repo/db"
import { getServerSession } from "next-auth";
import { authConfig } from "../../lib/authConfig";
import axios from "axios";

const url = process.env.NODE_ENV === 'production' ? process.env.WEBHOOKURL : "http://localhost:3003";
interface Transaction {
    amount: number;
    email?: string;
    phone?: string;
}
const transfer = async ({ amount, email, phone }: Transaction) => {

}
const sendP2PWebhook = async (transactionId: string) => {
    try {
        const response = await axios.post(`${url}/p2pTransactionWebhook`, {
            transactionId: transactionId,
        })
        const data = response.data
        console.log("Webhook response:", data);
    } catch (error) {
        console.error("Failed to send webhook:", error);
    }
};
const createNewP2PTransaction = async ({ amount, email, phone }: Transaction) => {
    const session = await getServerSession(authConfig) as any;

    if (!session || !session.user) {
        return { error: "Unauthorized" };
    }
    const fromId = session.user.id;
    let user;
    if (email) {
        user = await db.user.findFirst({ where: { email } });
    } else if (phone) {
        user = await db.user.findFirst({ where: { number: phone } });
    } else {
        return { error: "Invalid request" };
    }

    if (!user) {
        return { error: "User not found" };
    }

    try {
        const result = await db.$transaction(async (tx: any) => {
            const initialBalance = await tx.balance.findFirst({
                where: { userId: fromId, locked: false }
            });

            if (!initialBalance) {
                throw new Error("Insufficient balance");
            }

            const transaction = await tx.p2PTransaction.create({
                data: {
                    amount,
                    fromUserId: fromId,
                    toUserId: user.id,
                    status: "PENDING",
                    startTime: new Date(),
                    decimal: 2
                }
            });

            if (!transaction) {
                throw new Error("Transaction creation failed");
            }

            const userBalance = await tx.balance.create({
                data: {
                    amount,
                    userId: user.id,
                    locked: true,
                    version: 0,
                    decimal: 2,
                    status: "LOCKED_FOR_TRANSACTION"
                }
            });

            if (!userBalance) {
                throw new Error("User balance update failed");
            }

            const unlockedBalance = await tx.balance.update({
                data: {
                    amount: { decrement: amount }
                },
                where: { id: initialBalance.id }
            });

            if (!unlockedBalance) {
                throw new Error("Sender balance update failed");
            }
            await sendP2PWebhook(transaction.id);
            return { message: "Transaction successful", error: null };
        });

        return result;
    } catch (E: any) {
        return { error: `${E.message}` };
    }
}
const transferBalance = async (toId: string, amount: number) => {
    const session = await getServerSession(authConfig) as any;
    const fromId = session.user.id;
    if (!session || !session.user) {
        return {
            error: "Unauthorized"
        }
    }
    const user = db.user.findFirst({
        where: {
            id: session.user!.id
        }
    })
    if (!user) {
        return {
            error: "User not found"
        }
    }
    try {
        await db.$transaction(async (tx: any) => {

            // await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${fromId} FOR UPDATE`;
            /// For locking

            const fromBalance = await tx.balance.findFirst({
                where: {
                    userId: fromId
                }
            })

            if (!fromBalance || fromBalance.amount < amount) {
                throw new Error("Insufficient balance")
            }

            const toBalance = await tx.balance.findFirst({
                where: {
                    userId: toId
                }
            })

            if (!toBalance) {
                throw new Error("Invalid account")
            }


            const fromUpdate = await tx.balance.updateMany({
                data: {
                    amount: {
                        decrement: amount
                    },
                    version: {
                        increment: 1
                    }
                },
                where: {
                    userId: fromId,
                    version: fromBalance.version
                }
            })

            if (!fromUpdate) {
                throw new Error("Transaction conflict on sender's account. Please retry.")
            }

            const toUpdate = await tx.balance.updateMany({
                data: {
                    amount: {
                        increment: amount
                    }
                    , version: {
                        increment: 1
                    }
                },
                where: {
                    userId: toId,
                    version: toBalance.version
                }
            })

            if (!toUpdate) {
                throw new Error("Transaction conflict on receiver's account. Please retry.")
            }

        })
        return {
            message: "Transaction successful",
            error: ""
        }
    } catch (e: any) {
        return {
            error: e.message,
            message: "Transaction failed"
        }
    }

}

export {
    transferBalance,
    transfer,
    createNewP2PTransaction
}