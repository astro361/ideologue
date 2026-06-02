import { auth } from "@/auth";
import Header from "@/components/Header";
import IdeaDetail from "./IdeaDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function IdeaPage({ params }: PageProps) {
  const session = await auth();
  const { id } = await params;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header user={session?.user} />
      <IdeaDetail ideaId={id} currentUserId={session?.user?.id} />
    </div>
  );
}
