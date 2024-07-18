import {
  Button, HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@repo/ui";

export default function Home() {
  console.log(process.env.NEXTAUTH_URL);
  return (
    <div className="flex p-10 bg-primary-foreground">
      <HoverCard>
        <HoverCardTrigger>
          <Button variant={"themeYellow"}>Hi</Button>
        </HoverCardTrigger>
        <HoverCardContent className="bg-destructive">
          The React Framework – created and maintained by @vercel.
        </HoverCardContent>
      </HoverCard>


    </div>
  );
}
