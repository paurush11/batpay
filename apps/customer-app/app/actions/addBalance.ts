"use server"
import db from "@repo/db"
import { getServerSession } from "next-auth";
import { authConfig } from "../../lib/authConfig";

const computeBalanceForUser = async (userId: string) => {
    try {
        const userExists = await db.user.findFirst({
            where: {
                id: userId,
            }
        })
        if (!userExists) {
            throw new Error("User does not exist");
        }
        const balance = await db.balance.findFirst({
            where: {
                userId: userId,
            }
        })
        if (!balance) {
            throw new Error("Balance not found");
        }
        return balance;

    } catch (e: any) {
        throw new Error(e.message)
    }

}
const addBalance = async (amount: number, userId: string) => {
    try {
        const userExists = await db.user.findFirst({
            where: {
                id: userId,
            }
        })
        if (!userExists) {
            throw new Error("User does not exist");
        }
        const balance = await db.balance.findFirst({
            where: {
                userId: userId,
            }
        })
        if (!balance) {
            const newBalance = await db.balance.create({
                data: {
                    amount,
                    decimal: 2,
                    userId: userId,
                    locked: false,
                    version: 1
                }
            })
            return {
                message: "Balance created successfully",
                data: newBalance.amount
            }
        }
        const updatedBalance = await db.balance.updateMany({
            where: {
                userId: userId,
            },
            data: {
                amount: {
                    increment: amount,
                }
            }
        })
        return {
            message: "Balance updated successfully",
            data: balance.amount + amount
        }
    } catch (e: any) {
        return {
            message: "Something went wrong",
            error: e
        }
    }
}

const addMyBalance = async (amount: number) => {
    const session = await getServerSession(authConfig);
    try {
        if (!session || !session.user) {
            throw new Error("Unauthorized");
        }
        const userId = (session!.user as any).id;
        return await addBalance(amount, userId);

    } catch (E: any) {
        return {
            message: "Something went wrong",
            error: E
        }
    }
}

export {
    addBalance,
    addMyBalance,
    computeBalanceForUser
}