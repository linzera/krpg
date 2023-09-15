import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Campaigns() {
  return (
    <div className="bg-background">
      <Link href="/campaigns/new">
        <Button>Nova campanha</Button>
      </Link>
    </div>
  );
}
