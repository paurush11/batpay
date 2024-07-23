import { type NextRequest } from 'next/server';
import { processToken } from "./generateToken";
import { TProvider } from "@repo/zodTypes";
export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        return Response.json({ message: "Method Not Allowed" }, { status: 405 })
    }
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('provider')
    const amount = searchParams.get('amount')
    const userId = searchParams.get('userId')

    if (!userId) {
        return Response.json({ message: "User ID is required" }, { status: 400 })
    }
    if (!query) {
        return Response.json({ message: "Provider is required" }, { status: 400 })
    }
    if (!amount) {
        return Response.json({ message: "Amount is required" }, { status: 400 })
    }
    const amountInNumber = parseInt(amount as string)
    if (isNaN(amountInNumber)) {
        return Response.json({ message: "Amount should be a number" }, { status: 400 })
    }
    if (amountInNumber < 1) {
        return Response.json({ message: "Amount should be greater than 0" }, { status: 400 })
    }
    if (amountInNumber > 1000000) {
        return Response.json({ message: "Amount should be less than 1000000" }, { status: 400 })
    }

    const validProviders: TProvider[] = ["HDFC", "CHASE", "BANK_OF_AMERICA", "ICICI", "GOLDMAN_SACHS"];

    if (!validProviders.includes(query as TProvider)) {
        return Response.json({ message: "Invalid provider" }, { status: 400 })
    }
    try {
        const token = await processToken({
            provider: query as string,
            amount: amountInNumber,
            userId: userId as string,
        });
        return Response.json({ token: token.token }, { status: 200 })
    } catch (e) {
        return Response.json({ message: "Something went wrong" }, { status: 500 })
    }



}


