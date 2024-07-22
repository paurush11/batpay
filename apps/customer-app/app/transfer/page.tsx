import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'
import MainContent from './MainContent';

export default async function Transfer() {
    const session = await getServerSession();
    if (!session?.user) {
        redirect("/")
    }
    return (
        <div className="flex bg-primary-foreground p-10 min-h-screen" >
            <MainContent />
        </div>
    );
}


