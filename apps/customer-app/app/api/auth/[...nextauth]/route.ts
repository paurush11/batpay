import NextAuth from "next-auth"
import { authConfig } from "../../../../lib/authConfig"
import { checkIfReqShouldBeAllowedOnIP } from "../../../../lib/rateLimiter";
import { NextRequest, NextResponse } from "next/server";


const handler = async (req: NextRequest) => {
    const allowed = await checkIfReqShouldBeAllowedOnIP(req);
    if (!allowed) {
        return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    return NextAuth(authConfig);
}

export {
    handler as GET,
    handler as POST,
}
