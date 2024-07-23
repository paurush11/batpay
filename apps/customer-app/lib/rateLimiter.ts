import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const NO_OF_ALLOWED_REQUESTS = 5;
const TIME_FRAME = 60 * 1000; // One Min;
const rateLimitMap: Record<string, { count: number, time: number }> = {}
const fetchIpAddress = (req: NextRequest) => {
    let ipAdd = req.headers.get("x-real-ip") as string;
    const ip = req.headers.get("x-forwarded-for") as string;
    if (!ip || !ipAdd) {
        ipAdd = ip?.split(",")[0] ?? "Unknown";
    }
    return ipAdd;
}
const checkIfReqShouldBeAllowedOnIP = (req: NextRequest) => {
    // const ip = fetchIpAddress(req); //  If not on vercel
    const ip = req.ip ?? "Unknown";
    if (ip === "Unknown") return false;
    const currentTime = Date.now();
    if (!rateLimitMap[ip]) {
        rateLimitMap[ip] = {
            count: 1,
            time: currentTime
        }
        return true;
    }
    const { count, time } = rateLimitMap[ip];
    if (currentTime - time > TIME_FRAME) {
        rateLimitMap[ip] = {
            count: 1,
            time: currentTime
        }
        return true;
    }

    if (count < NO_OF_ALLOWED_REQUESTS) {
        rateLimitMap[ip].count++;
        return true;
    }

    return false;
}


export {
    checkIfReqShouldBeAllowedOnIP
}