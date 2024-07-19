"use server";

import { getServerSession } from "next-auth";
import { authConfig } from "../../lib/authConfig";
import db from "@repo/db";
import axios from "axios";
import { TProvider } from "@repo/zodTypes";
import { computeBalanceForUser } from "./addBalance";


interface IRequestToken {
    amount: number;
    provider: TProvider;
    userId: string;
}
interface IResponseToken {
    url: string;
    token: string;
}

const requestToken = async (requestTokenProps: IRequestToken): Promise<IResponseToken> => {
    let token = ""
    let baseUrl = process.env.NODE_ENV === 'production'
        ? process.env.TOKEN_REQUEST_URL
        : 'http://localhost:3000';
    let url = `${baseUrl}/api`
    try {
        const response = await axios.get(url, {
            params: {
                amount: requestTokenProps.amount,
                provider: requestTokenProps.provider as String,
                userId: requestTokenProps.userId as String,
            }
        })
        token += response.data.token;
    } catch (E: any) {
        throw new Error(E.message)
    }
    let redirect_url = `${baseUrl}/?token=${token}&amount=${requestTokenProps.amount}`;
    return {
        url: redirect_url,
        token,
    } as IResponseToken
}

const createOnRampTransaction = async (amount: number, provider: TProvider) => {
    const session = await getServerSession(authConfig);
    if (!session || !session.user) {
        throw new Error("Unauthorized");
    }

    const userId = (session!.user as any).id;
    try {
        const balance = await computeBalanceForUser(userId);
        if (!balance || !balance.unLockedBalance || balance.unLockedBalance < amount / 100) {
            throw new Error("Insufficient balance");
        }
        const { url, token } = await requestToken({ amount, provider, userId });

        await db.onRampTransaction.create({
            data: {
                amount,
                provider,
                userId,
                startTime: new Date(),
                decimal: 2,
                token,
                status: "PROCESSING"
            }
        })
        return {
            message: "OnRamp Transaction created successfully",
            url
        }

    } catch (e: any) {
        return {
            message: "Something went wrong",
            error: e.message
        }
    }

}


export {
    createOnRampTransaction
}