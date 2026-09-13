// app/admin/layout.tsx
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import AdminSidebarShell from "@/components/admin-sidebar-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  //console.log("ADMIN SESSION:", session);

  if (!session || !session.user.isAdmin) {   // was: session.role !== "admin"
    redirect("/");
  }

  return (
    <AdminSidebarShell user={session}>
      {children}
    </AdminSidebarShell>
  );
}