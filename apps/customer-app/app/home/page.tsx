import { SpeedInsights } from '@vercel/speed-insights/next';
import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";
import { authConfig } from '../../lib/authConfig';
import HomeComponent from './HomeComponent';

export default async function Home() {
    const session = await getServerSession(authConfig);
    if (!session?.user) {
        redirect("/");
    }
    const userId = (session.user as any).id;

    return (
        <>
            <div className="bg-primary-foreground" >
                <HomeComponent userId={userId}  />
            </div>
            <SpeedInsights />
        </>
    );
}

