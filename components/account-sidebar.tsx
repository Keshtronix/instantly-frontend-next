"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  LogOut,
  MapPin,
  MessageSquareText,
  ReceiptText,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const accountNavItems = [
  {
    label: "Profile",
    href: "/account/profile",
    icon: ReceiptText,
  },
  {
    label: "Order history",
    href: "/account/orders",
    icon: ReceiptText,
  },
  {
    label: "Ratings & reviews",
    href: "/account/reviews",
    icon: MessageSquareText,
  },
  {
    label: "Addresses",
    href: "/account/addresses",
    icon: MapPin,
  },
];

export default function AccountSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="border-border lg:border-r lg:pr-5">
      <div className="flex flex-col gap-2 lg:sticky lg:top-24">
        <Button
          type="button"
          variant="ghost"
          className="w-fit px-0"
          onClick={() => router.back()}
        >
          <ArrowLeft data-icon="inline-start" />
          Back
        </Button>

        <Separator className="h-px bg-border" />

        <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
          {accountNavItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/orders"
                ? pathname === "/orders"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-w-fit items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted lg:min-w-0",
                  isActive && "bg-foreground text-background hover:bg-foreground"
                )}
              >
                <Icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Separator className="hidden h-px bg-border lg:block" />

        <div className="hidden flex-col gap-2 lg:flex">
          <Button variant="ghost" className="justify-start px-3 text-muted-foreground">
            <LogOut data-icon="inline-start" />
            Log out
          </Button>
        </div>
      </div>
    </aside>
  );
}