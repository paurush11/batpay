import db from "@repo/db";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { createAccountForGoogleOrGitHub } from "./authUtils";
import { checkIfReqShouldBeAllowedOnIP, checkIfReqShouldBeAllowedOnPhone } from "./rateLimiter";


export const authConfig: AuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: { label: "phone number", type: "text", placeholder: "Enter your phone number", },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    let ip: string = req.headers?.["x-real-ip"] as string;
                    let ip2: string = req.headers?.["x-forwarded-for"] as string;
                    if (!ip) {
                        ip = ip2?.split(",")[0] ?? "Unknown";
                    }
                    const isAllowed = ip === "Unknown" ? checkIfReqShouldBeAllowedOnPhone(credentials?.phone ?? "") : checkIfReqShouldBeAllowedOnIP(ip);
                    if (!isAllowed) throw new Error("Too many requests");

                    const existingUser = await db.user.findFirst({
                        where: {
                            number: credentials?.phone
                        }
                    })

                    if (existingUser) {
                        const isPasswordCorrect = bcrypt.compareSync(credentials?.password, existingUser.password)
                        if (isPasswordCorrect) {
                            return {
                                id: existingUser.id.toString(),
                                name: existingUser.name,
                                email: existingUser.number
                            } as any;

                        }
                        return null;
                    }

                } catch (E) {
                    throw new Error(`${E}`);
                }
            }
        })
    ],
    pages: {
        signIn: "/signin"

    },
    secret: process.env.NEXTAUTH_SECRET || "secret",
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                // This ensures we store the provider ID in the JWT
                token.providerAccountId = account.providerAccountId;
            }
            return token;
        },
        async session({ token, session }: any) {
            session.user.id = token.sub || token.providerAccountId;
            return session;
        },
        async signIn({ user, account }) {
            if (account?.provider === "google" || account?.provider === "github") {
                const response = await createAccountForGoogleOrGitHub(user);
                if (response?.user) {
                    ///send userid
                    user.id = response.user.id
                    return true;
                } else {
                    return false
                }
            }
            return true;
        }
    },
    debug: true,

}

