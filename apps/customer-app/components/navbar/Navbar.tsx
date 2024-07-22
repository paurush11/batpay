"use client"
import { Button } from '@repo/ui';
import { cn } from '@repo/ui/lib/utils';
import { signIn, useSession } from "next-auth/react";
import Link from 'next/link';
import React from 'react';
import ThemeToggler from '../theme-toggler';
import { grafata } from "./Constants";
import DropdownMenuComponent from './Dropdown';
import { useMediaQuery } from 'react-responsive';
import { FaHome, FaExchangeAlt, FaMoneyCheckAlt } from 'react-icons/fa'; // Example icons from react-icons
import { useRouter } from 'next/navigation';



export const Navbar: React.FC = () => {
    const { data: session, status: sessionStatus } = useSession();
    const username = session?.user?.name;
    const isLoading = sessionStatus === 'loading';
    const isSmallScreen = useMediaQuery({ query: '(max-width: 728px)' });
    const router = useRouter();
    return (

        <div className="flex items-center p-4 bg-primary-foreground border-border border-b-2">
            <div className={cn(" text-3xl  text-end p-2 text-primary ", grafata.className)}>
                {!isSmallScreen ?
                    <Link href={"./"}>
                        Batish PayTM
                    </Link> :
                    <Link href={"./"}>
                        BatPay
                    </Link>
                }

            </div>
            {!isLoading &&

                <div className="flex ml-auto gap-4 items-center ">
                    {username && (
                        isSmallScreen ? (<>
                            <Button variant={"secondary"} onClick={() => router.push("/home")}> <FaHome className='h-4 w-4' /></Button>
                            <Button variant={"secondary"} onClick={() => router.push("/transactions")}> <FaExchangeAlt className='h-4 w-4' /></Button>
                            <Button variant={"secondary"} onClick={() => router.push("/transfer")}> <FaMoneyCheckAlt className='h-4 w-4' /></Button>
                        </>) : (<>
                            <Button variant={"secondary"} onClick={() => router.push("/home")}>Home</Button>
                            <Button variant={"secondary"} onClick={() => router.push("/transactions")}>Transactions</Button>
                            <Button variant={"secondary"} onClick={() => router.push("/transfer")}>Transfer</Button>
                        </>))
                    }


                    <ThemeToggler />
                    {
                        username ?

                            <DropdownMenuComponent message={username} />
                            : <Button variant={"themeBlue"} onClick={() => signIn()}>Sign in</Button>
                    }
                </div >


            }
        </div >

    );
}