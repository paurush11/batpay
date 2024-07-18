import React from 'react'
import { Poppins, Libre_Baskerville } from "next/font/google"
import { cn } from '@repo/ui/lib/utils';
import { Medal } from 'lucide-react';

const headingFont = Libre_Baskerville({
    weight: ['400', '700'],
    subsets: ['latin'],
});
const textFont = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
});

const Tagline = () => {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center p-4 gap-2',
                headingFont.className,
            )}
        >
            <div className="md:text-md mb-4 flex items-center rounded-full border bg-blue-50 px-4 py-2.5 font-sans text-lg font-semibold uppercase text-blue-700 shadow-md md:px-5">
                <Medal className="mr-2 h-5 w-5" />
                #1 payment platform
            </div>

            <h1 className="mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-center text-4xl text-transparent md:mb-4 md:text-6xl">
                BatPay
            </h1>

            <div className="w-fit px-4 pb-4 text-center text-3xl  md:text-6xl">
                Powering Your Payments, Effortlessly.
            </div>

            <div
                className={cn(
                    'mx-auto mt-4 max-w-sm px-2 text-center text-sm text-neutral-400 dark:text-neutral-500 md:max-w-2xl md:text-xl',
                    textFont.className,
                )}
            >
                Introducing Batish PayTM: your solution for seamless, secure, and efficient payments. Manage your finances effortlessly,
                whether you're paying bills, shopping online, or sending money.
                Experience the convenience of effortless transactions with Batish PayTM.

            </div>
        </div>
    )
}

export {
    Tagline
}
