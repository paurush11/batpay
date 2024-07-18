"use server";
import db from '@repo/db';
import axios from 'axios';

const processPayment = async (amount: number, token: string) => {
    try {
        await db.$transaction(async tx => {
            // check the token;
            const bankAmountToBeAdded = await tx.bankToken.findFirst({
                where: {
                    token: token,
                }
            })
            if (!bankAmountToBeAdded) {
                throw new Error("Invalid token");
            }

            if (bankAmountToBeAdded?.isUsed) {
                throw new Error("Token already used");
            }

            if (bankAmountToBeAdded?.amount !== amount) {
                throw new Error("Amount mismatch");
            }

            await tx.onRampTransaction.update({
                where: {
                    token: token,
                    userId: bankAmountToBeAdded?.userId,
                    amount: amount
                },
                data: {
                    status: "AUTHORIZED"
                }
            })

            await tx.bankToken.update({
                where: {
                    token: token,
                },
                data: {
                    isUsed: true
                }
            })
        })
        await sendWebhook(token);
        return {
            message: "Payment processed successfully"
        }
    } catch (e: any) {
        return {
            error: e.message,
            message: "Payment failed"
        }
    }
}
const sendWebhook = async (token: string) => {
    try {
        const response = await axios.post("http://localhost:3003/webhookRAMP", {
            token: token,
        })
        const data = response.data
        console.log("Webhook response:", data);
    } catch (error) {
        console.error("Failed to send webhook:", error);
    }
};
const cancelPayment = async (token: string) => {
    try {
        await db.$transaction(async tx => {
            const bankAmountToBeAdded = await tx.bankToken.findFirst({
                where: {
                    token: token,
                }
            })
            if (!bankAmountToBeAdded) {
                throw new Error("Invalid token");
            }

            if (bankAmountToBeAdded?.isUsed) {
                throw new Error("Token already used");
            }

            await tx.onRampTransaction.update({
                where: {
                    token: token,
                    userId: bankAmountToBeAdded?.userId,
                },
                data: {
                    status: "CANCELLED"
                }
            })

            return {
                message: "Payment cancelled successfully"
            }
        })

    } catch (e: any) {
        return {
            error: e.message,
            message: "Payment Cancelled"
        }
    }

}
export {
    processPayment,
    cancelPayment
}