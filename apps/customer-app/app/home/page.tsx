import React from 'react'
import HomeComponent from './HomeComponent';
import { getServerSession } from 'next-auth';
import { authConfig } from '../../lib/authConfig';
import { redirect } from "next/navigation";
import { SpeedInsights } from '@vercel/speed-insights/next';

export default async function Home() {
    const session = await getServerSession(authConfig);
    if (!session?.user) {
        redirect("/");
    }
    const userId = (session.user as any).id;
    return (
        <>
            <div className="bg-primary-foreground" >
                <HomeComponent userId={userId} />
            </div>
            <SpeedInsights />
        </>
    );
}

