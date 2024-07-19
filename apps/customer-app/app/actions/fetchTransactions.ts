"use server"
import db from "@repo/db"
import { getServerSession } from "next-auth";
import { authConfig } from "../../lib/authConfig";

const fetchTransactions = async () => {
    const session = await getServerSession(authConfig)
    try {
        if (!session || !session.user) {
            throw new Error("Unauthorized")
        }
        const userId = (session.user as any).id
        const onRampTransactions = await db.onRampTransaction.findMany({
            where: {
                userId: userId,
            }
        })
        const fromP2PTransactions = await db.p2PTransaction.findMany({
            where: {
                fromUserId: userId,
            },
            include: {
                toUser: true,
                fromUser: true
            }
        })
        const toP2PTransactions = await db.p2PTransaction.findMany({
            where: {
                toUserId: userId,
            },
            include: {
                toUser: true,
                fromUser: true
            }
        })

        return {
            data: {
                onRampTransactions,
                fromP2PTransactions,
                toP2PTransactions
            },
            error: ""
        }
    } catch (E: any) {
        return {
            error: E.message,
            data: null
        }
    }
}

export {
    fetchTransactions
}