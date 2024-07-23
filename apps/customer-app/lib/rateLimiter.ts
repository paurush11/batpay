import { NextRequest } from "next/server";
import { kv } from "@vercel/kv";

const NO_OF_ALLOWED_REQUESTS = 50;
const TIME_FRAME = 60 * 1000; // One Min;

const fetchIpAddress = (req: NextRequest) => {
    let ipAdd = req.headers.get("x-real-ip") as string;
    const ip = req.headers.get("x-forwarded-for") as string;
    if (!ip) {
        ipAdd = ip?.split(",")[0] ?? "Unknown";
    }
    return ipAdd;
}

const checkIfReqShouldBeAllowed = async (key: string) => {
    const currentTime = Date.now();
    try {
        const value: {
            count: number,
            time: number
        } = await kv.get(key) ?? {
            count: 0,
            time: currentTime
        };

        if (value.time === currentTime) {
            await kv.set(
                key,
                { count: 1, time: currentTime },
                { px: TIME_FRAME } // Set expiration time in seconds
            );
            return true;
        }

        const { count, time } = value;
        if (currentTime - time > TIME_FRAME) {
            console.log("Resetting")
            await kv.set(
                key,
                { count: 1, time: currentTime },
                { px: TIME_FRAME } // Reset expiration time
            );
            return true;
        }

        if (count < NO_OF_ALLOWED_REQUESTS) {
            console.log("Incrementing")

            await kv.set(
                key,
                { count: count + 1, time: time },
                { px: (TIME_FRAME - (currentTime - time)) } // Adjust the TTL to the remaining time
            );
            return true;
        }

        return false;
    } catch (error) {
        throw new Error(`Error in rate limiter ${error}`);
    }
}
const checkIfReqShouldBeAllowedOnIP2 = async (req: NextRequest) => {
    let ip = fetchIpAddress(req); //  If not on vercel
    if (ip === "Unknown") {
        ip = req.ip ?? "Unknown"
    }
    if (ip === "Unknown") return false;
    return await checkIfReqShouldBeAllowed(ip);

}

const checkIfReqShouldBeAllowedOnPhone = async (phone: string) => {
    return await checkIfReqShouldBeAllowed(phone);
}
const checkIfReqShouldBeAllowedOnIP = async (ip: string) => await checkIfReqShouldBeAllowed(ip);

export {
    checkIfReqShouldBeAllowedOnIP,
    checkIfReqShouldBeAllowedOnPhone
};
