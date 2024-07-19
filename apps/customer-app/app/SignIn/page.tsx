import { getServerSession } from 'next-auth';
import React from 'react'
import { authConfig } from '../../lib/authConfig';
import { redirect } from 'next/navigation';
import SignInComponent from './SignInComponent';

const page: React.FC = async () => {
    const session = await getServerSession(authConfig);
    if (session?.user) {
        redirect("/");
    }
    return <SignInComponent />
}

export default page;