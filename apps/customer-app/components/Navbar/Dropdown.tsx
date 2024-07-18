"use client";
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@repo/ui";

import { cn } from '@repo/ui/lib/utils';
import { signOut } from "next-auth/react";
import { grafata } from "./Constants";

const DropDownMenuComponent = ({ message }: {
    message: string;
}) => {


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary">{message.charAt(0).toUpperCase()}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=' bg-primary-foreground'>
                <DropdownMenuLabel className={cn('p-2 py-3 text-xl', grafata.className)}>{message}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='p-2 py-3'>Profile</DropdownMenuItem>
                <DropdownMenuItem className='p-2 py-3'>Billing</DropdownMenuItem>
                <DropdownMenuItem className='p-2 py-3'>Team</DropdownMenuItem>
                <DropdownMenuItem className='p-2 py-3'>Subscription</DropdownMenuItem>
                <DropdownMenuItem className='flex px-3 py-0'><Button variant={"ghost"} size={"icon"} onClick={() => {
                    setTimeout(() => {
                        signOut({
                            redirect: true,
                            callbackUrl: "/"
                        })
                    }, 500)
                }}>Logout</Button></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default DropDownMenuComponent;

