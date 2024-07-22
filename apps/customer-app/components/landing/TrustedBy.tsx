import React from 'react'
import Image from 'next/image';
import Link from 'next/link';


export const TrustedBy: React.FC = () => {
    return (
        <div className="flex flex-col lg:p-40 lg:pt-20 pt-10 items-center gap-2 w-full  bg-primary-foreground">
            <div className="flex text-4xl font-serif">Trusted By</div>
            <div className="flex items-center justify-between  w-full p-10 ">
                <Link href={"./"} className='bg-white p-2 rounded-lg hover:bg-gradient-to-t from-slate-50 to-slate-400 shadow-xl'>
                    <Image alt='facebook' width={"40"} height={"40"} src={"/meta.png"} />
                </Link>
                <Link href={"./"} className='bg-white p-2 rounded-xl hover:bg-gradient-to-t from-slate-50 to-slate-400 shadow-xl'>
                    <Image alt='netflix' width={"40"} height={"40"} src={"/netflix.png"} /></Link>
                <Link href={"./"} className='bg-white p-2 rounded-xl hover:bg-gradient-to-t from-slate-50 to-slate-400 shadow-xl'>
                    <Image alt='paypal' width={"40"} height={"40"} src={"/paypal.png"} /></Link>
                <Link href={"./"} className='bg-white p-2 rounded-xl hover:bg-gradient-to-t from-slate-50 to-slate-400 shadow-xl'>
                    <Image alt='venmo' width={"40"} height={"40"} src={"/venmo.png"} /></Link>
                <Link href={"./"} className='bg-white p-2 rounded-xl h-14 flex  hover:bg-gradient-to-t from-slate-50 to-slate-400 shadow-xl ' >
                    <Image alt='nextjs' width={"40"} height={"40"} src={"/next.svg"} ></Image>
                </Link>
                <Link href={"./"} className='bg-white p-2 rounded-xl hover:bg-gradient-to-t from-slate-50 to-slate-400 shadow-xl'>
                    <Image alt='gpay' width={"40"} height={"40"} src={"/google-pay.png"} /></Link>
            </div>
        </div>
    );
}