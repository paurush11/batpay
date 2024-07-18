import { getServerSession } from "next-auth";
import LandingPage from "../components/Landing/LandingPage";
import { authConfig } from "../lib/authConfig";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authConfig);
  if (session?.user) {
    redirect("/home");
  }

  return (
    <div className={" bg-primary-foreground pt-20"} style={{
    }}>
      <LandingPage />
    </div>
  );
}



