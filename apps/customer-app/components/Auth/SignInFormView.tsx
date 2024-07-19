"use client"

import { Button } from "@repo/ui"
import { cn } from "@repo/ui/lib/utils"
import { Loader } from "lucide-react"
import { signIn } from "next-auth/react"
import * as React from "react"
import { FaGithub, FaGoogle } from "react-icons/fa"
import SignInFormController from "./SignInFormController"
import SignUpFormController from "./SignUpFormController"

interface SignInFormViewProps {
    buttonText: string,
    setButtonText: React.Dispatch<React.SetStateAction<string>>
}

export function SignInFormView({ buttonText, setButtonText }: SignInFormViewProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [signingIn, setSigningIn] = React.useState<boolean>(true)
    return (
        <div className={cn("grid gap-6")} >
            <SignInFormController isLoading={isLoading} signingIn={signingIn} setIsLoading={setIsLoading} />
            <SignUpFormController isLoading={isLoading} signingIn={signingIn} setIsLoading={setIsLoading} />
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or
                    </span>
                </div>
            </div>
            <Button className='flex' variant={"themeGreen"} onClick={() => {
                setSigningIn(v => !v),
                    setButtonText(text => text === "Create Account" ? "Sign In" : "Create Account")
            }
            }>{buttonText}</Button>

            <div className="flex w-full justify-center gap-2">
                <Button variant="outline" type="button" disabled={isLoading} className="w-full" onClick={() => signIn("github", { redirect: false })}>
                    {isLoading ? (
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <FaGithub className="mr-2 h-4 w-4" />
                    )}{" "}
                    GitHub
                </Button>
                <Button variant={"outline"} type="button" disabled={isLoading} className="w-full" onClick={() => signIn("google", { redirect: false })}>
                    {isLoading ? (
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <FaGoogle className="mr-2 h-4 w-4" />
                    )}{" "}
                    Google
                </Button>
            </div>
        </div >
    )
}