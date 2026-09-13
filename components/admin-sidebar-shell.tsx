"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  ArrowLeft,
  LogOut,
  Ticket,
  User,
} from "lucide-react";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { logoutMutationFn } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, end: true },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: Package },
  { label: "Customers", href: "/admin/customers", icon: User },
  { label: "Coupons", href: "/admin/coupons", icon: Ticket },
];

type AdminUser = {
  userId: string;
  email: string;
  role: "user" | "admin";
  name?: string;
};

export default function AdminSidebarShell({
  user,
  children,
}: {
  user: AdminUser;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logoutMutationFn,
    onSuccess: () => {
      queryClient.setQueryData(["current-user"], null);
      toast.success("Logged out successfully");
      router.push("/");
      router.refresh(); // clears the server session cache so middleware/layout re-checks on next nav
    },
  });

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r border-border">
          <SidebarHeader className="flex h-16 items-center border-b border-border/10 px-4">
            <div className="flex items-center gap-2 font-semibold">
              <Logo href="/admin" />
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                Admin
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.end
                      ? pathname === item.href
                      : pathname.startsWith(item.href);

                    return (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link
                            href={item.href}
                            className="flex w-full items-center gap-3 text-[15px]! rounded-lg py-2 font-medium transition-all"
                          >
                            <Icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-border/10 p-3 gap-2">
            <Button
              size="lg"
              className="w-full justify-start gap-2 bg-gray-800"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="h-4 w-4" />
              Storefront
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-red-500 hover:bg-destructive/10 hover:text-destructive"
              onClick={() => logoutMutation.mutate()}
            >
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-foreground">
                Admin Portal
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end text-xs">
                <span className="font-semibold">{user.name}</span>
                <span className="text-muted-foreground">{user.email}</span>
              </div>
            </div>
          </header>
          <main className="flex-1 w-full max-w-[1100px] mx-auto overflow-y-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}