// app/(shop)/account/layout.tsx — was AccountLayout + account-slice of ProtectedGuard
import AccountSidebar from "@/components/account-sidebar";
import { getSession } from "@/lib/session"; // your server-side session util
import { redirect } from "next/navigation";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  //console.log("CUSTOMER SESSION:", session);
  if (!session) redirect("/");

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr] items-start mt-8">
      <AccountSidebar />
      {children}
    </div>
  );
}
