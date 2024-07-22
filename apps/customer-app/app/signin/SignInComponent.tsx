import React from 'react'
import { Libre_Baskerville } from 'next/font/google';
import { cn } from '@repo/ui/lib/utils';
import SignInForm from './SignInForm';
const headingFont = Libre_Baskerville({
    weight: ['400', '700'],
    subsets: ['latin'],
});

const SignInComponent = () => {
    return (
        <div className="grid grid-cols-2 bg-primary-foreground" style={{ minHeight: '90vh' }}>
            <div className="flex flex-col p-10  justify-center border-border" style={{
                borderRight: '2px solid hsl(var(--border))',
            }}>
                <div className={cn(headingFont.className, "flex flex-col gap-8")} >
                    <h1 className="text-4xl">
                        BatPay
                    </h1>
                    <div
                        className={cn(
                            'mx-auto mt-4 max-w-sm px-2 text-center text-sm text-neutral-400 dark:text-neutral-500 md:max-w-2xl md:text-xl',
                            headingFont.className,
                        )}
                    >
                        Introducing Batish PayTM: your solution for seamless, secure, and efficient payments. Manage your finances effortlessly,
                        whether you're paying bills, shopping online, or sending money.
                        Experience the convenience of effortless transactions with Batish PayTM.
                    </div>
                    <div className="flex ml-auto text-pretty font-light italic">
                        - Paurush Batish
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center border-l-2 border-solid border-border p-10 ">
                <SignInForm />

            </div>
        </div>
    )
}

export default SignInComponent
