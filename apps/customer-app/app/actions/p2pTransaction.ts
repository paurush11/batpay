"use server"
import db from "@repo/db"
import { getServerSession } from "next-auth";
import { authConfig } from "../../lib/authConfig";

// const url = process.env.NODE_ENV === 'production' ? process.env.WEBHOOKURL : "http://localhost:3003";

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
}

export {
    transferBalance
}