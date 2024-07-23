import NextAuth from "next-auth"
import { authConfig } from "../../../../lib/authConfig"
import { NextApiRequest, NextApiResponse } from "next";
import { checkIfReqShouldBeAllowedOnIP } from "../../../../lib/rateLimiter";


const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const allowed = checkIfReqShouldBeAllowedOnIP(req, res);
    if (!allowed) {
        return res.status(429).json({ message: "Too many requests" });
    }
    return NextAuth(req, res, authConfig);
}

export {
    handler as GET,
    handler as POST,
}
