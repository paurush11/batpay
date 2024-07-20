import { getServerSession } from "next-auth";
import LandingPage from "../components/landing/LandingPage";
import { authConfig } from "../lib/authConfig";
import { redirect } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default async function Home() {
  const session = await getServerSession(authConfig);
  if (session?.user) {
    redirect("/home");
  }

  return (
    <div className={" bg-primary-foreground pt-20"} style={{
    }}>
      <LandingPage />
      <SpeedInsights />
    </div>
  );
}



