import { NextRequest } from "next/server";
import { kv } from "@vercel/kv";

const NO_OF_ALLOWED_REQUESTS = 50;
const TIME_FRAME = 60 * 1000; // One Min;

const fetchIpAddress = (req: NextRequest) => {
    let ipAdd = req.headers.get("x-real-ip") as string;
    const ip = req.headers.get("x-forwarded-for") as string;
    if (!ip || !ipAdd) {
        ipAdd = ip?.split(",")[0] ?? "Unknown";
    }
    return ipAdd;
}
const checkIfReqShouldBeAllowedOnIP = async (req: NextRequest) => {
    // const ip = fetchIpAddress(req); //  If not on vercel
    const ip = req.ip ?? "Unknown";
    if (ip === "Unknown") return false;

    const currentTime = Date.now();
    const value = await kv.get<{ count: number; time: number }>(ip);
    if (!value) {
        kv.set(ip, { count: 1, time: currentTime }, {
            ex: TIME_FRAME / 1000
        })
        return true;
    }
    const { count, time } = value;
    if (currentTime - time > TIME_FRAME) {
        await kv.set(ip, {
            count: 1,
            time: currentTime
        }, {
            ex: TIME_FRAME / 1000
        });
        return true;
    }

    if (count < NO_OF_ALLOWED_REQUESTS) {
        await kv.set(ip, {
            count: count + 1,
            time: time
        }, {
            ex: (TIME_FRAME - (currentTime - time)) / 1000
        });
        return true;
    }

    return false;
}


export {
    checkIfReqShouldBeAllowedOnIP
};
