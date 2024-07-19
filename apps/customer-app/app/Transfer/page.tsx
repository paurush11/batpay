import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'
import MainContent from './MainContent';

const page = async () => {
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

export default page
