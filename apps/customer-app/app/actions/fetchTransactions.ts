"use server"
import db from "@repo/db"
import { getServerSession } from "next-auth";
import { authConfig } from "../../lib/authConfig";
enum OnRampTransactionStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED',
    REFUNDED = 'REFUNDED',
    ON_HOLD = 'ON_HOLD',
    UNDER_REVIEW = 'UNDER_REVIEW',
    REVERSED = 'REVERSED',
    AUTHORIZED = 'AUTHORIZED',
    EXPIRED = 'EXPIRED'
}

enum P2PTransactionStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED'
}

enum Providers {
    HDFC = 'HDFC',
    CHASE = 'CHASE',
    BANK_OF_AMERICA = 'BANK_OF_AMERICA',
    ICICI = 'ICICI',
    GOLDMAN_SACHS = 'GOLDMAN_SACHS'
}
interface IOnRampTransactions {
    id: string;
    userId: string;
    amount: number;
    decimal: number;
    provider: Providers;
    token: string;
    startTime: Date;
    status: OnRampTransactionStatus;
}
interface IP2PTransaction {
    id: string;
    amount: number;
    decimal: number;
    startTime: Date;
    fromUserId: string;
    toUserId: string;
    status: P2PTransactionStatus;
}
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