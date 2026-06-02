import { auth } from "@/auth";
import Header from "@/components/Header";
import ExploreFeed from "./ExploreFeed";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[#F9F9FB]">
      <Header user={session?.user} />
      <ExploreFeed />
    </div>
  );
}
