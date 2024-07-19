import { getServerSession } from 'next-auth';
import React from 'react'
import { authConfig } from '../../lib/authConfig';
import { redirect } from 'next/navigation';
import SignInComponent from './SignInComponent';

interface pageProps {

}

const page: React.FC<pageProps> = async ({ }) => {
    const session = await getServerSession(authConfig);
    if (session?.user) {
        redirect("/");
    }
    return <SignInComponent />
}

export default page;