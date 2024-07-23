import React from 'react'
import HomeComponent from './HomeComponent';
import { getServerSession } from 'next-auth';
import { authConfig } from '../../lib/authConfig';
import { redirect } from "next/navigation";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { computeBalanceForUser } from '../../actions/addBalance';

export default async function Home() {
    const session = await getServerSession(authConfig);
    if (!session?.user) {
        redirect("/");
    }
    const userId = (session.user as any).id;
    let myBalance = {
        unLockedBalance: 0,
        lockedBalance: 0
    }
    try {
        const balance = await computeBalanceForUser(userId);
        console.log(balance)
        if (balance) {
            myBalance = balance;
        }
    } catch (e) {
        console.log(e)
    }
    return (
        <>
            <div className="bg-primary-foreground" >
                <HomeComponent userId={userId} myFetchedBalance={myBalance} />
            </div>
            <SpeedInsights />
        </>
    );
}

