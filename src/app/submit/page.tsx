import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import SubmitForm from "./SubmitForm";

export default async function SubmitPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="min-h-screen bg-[#F9F9FB]">
      <Header user={session.user} />
      <SubmitForm />
    </div>
  );
}
