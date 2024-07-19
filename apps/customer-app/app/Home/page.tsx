import React from 'react'
import HomeComponent from './HomeComponent';
import { getServerSession } from 'next-auth';
import { authConfig } from '../../lib/authConfig';
import { redirect } from "next/navigation";

const page: React.FC = async () => {
    const session = await getServerSession(authConfig);
    if (!session?.user) {
        redirect("/");
    }
    const userId = (session.user as any).id;
    return (
        <div className="bg-primary-foreground" >
            <HomeComponent userId={userId} />
        </div>

    );
}

export default page