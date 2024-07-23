import { NextApiRequest, NextApiResponse } from "next";

const NO_OF_ALLOWED_REQUESTS = 5;
const TIME_FRAME = 60 * 1000; // One Min;
const rateLimitMap: Record<string, { count: number, time: number }> = {}
const fetchIpAddress = (req: NextApiRequest) => {
    let ipAdd = req.headers["x-real-ip"] as string;
    const ip = req.headers['x-forwarded-for'] as string;
    if (!ip || !ipAdd) {
        ipAdd = ip?.split(",")[0] ?? "Unknown";
    }
    return ipAdd;
}
const checkIfReqShouldBeAllowedOnIP = (req: NextApiRequest, res: NextApiResponse) => {
    const ip = fetchIpAddress(req);
    console.log(ip);
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