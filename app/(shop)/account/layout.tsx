import AccountSidebar from "@/components/account-sidebar";
import RequireAuth from "@/components/require-auth";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <div className="grid gap-8 lg:grid-cols-[260px_1fr] items-start mt-8">
        <AccountSidebar />
        {children}
      </div>
    </RequireAuth>
  );
}