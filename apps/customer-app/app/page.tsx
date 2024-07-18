import { Button } from "@repo/ui";

export default function Home() {
  console.log(process.env.NEXTAUTH_URL);
  return (
    <div className="flex p-4 bg-primary-foreground">
      <Button variant={"themeYellow"}>Hi</Button>
    </div>
  );
}
