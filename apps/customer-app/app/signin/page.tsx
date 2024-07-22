import { getServerSession } from 'next-auth';
import React from 'react'
import { authConfig } from '../../lib/authConfig';
import { redirect } from 'next/navigation';
import SignInComponent from './SignInComponent';

export default async function SignIn() {
    const session = await getServerSession(authConfig);
    if (session?.user) {
        redirect("/");
    }
    return <SignInComponent />
}

