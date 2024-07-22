"use client";
import React, { useEffect } from 'react'
import { SignInFormView } from '../../components/auth/SignInFormView'
import Link from 'next/link'


const SignInForm = () => {
    const [buttonText, setButtonText] = React.useState<string>("Create Account")
    const [heading, setHeading] = React.useState<string>("Log In")
    const [description, setDescription] = React.useState<string>("Enter your email below to sign in your account")
    useEffect(() => {
        if (buttonText === "Create Account") {
            setHeading("Log In")
            setDescription("Enter your email below to sign in your account")
        } else {
            setHeading("Create Account")
            setDescription("Enter your email below to create your account")
        }
    }, [buttonText])
    return (
        <div className="flex-1 flex  gap-8  flex-col justify-center p-4">
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight ">
                    {heading}
                </h1>
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
            </div>
            <SignInFormView buttonText={buttonText} setButtonText={setButtonText} />
            <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                    href="/terms"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                    href="/privacy"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Privacy Policy
                </Link>
                .
            </p>

        </div>
    )
}

export default SignInForm
