"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/api";

type Props = {
  children: React.ReactNode;
  adminOnly?: boolean;
};

export default function RequireAuth({ children, adminOnly = false }: Props) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    retry: false,
  });

  const user = data?.user;
  const isAllowed = !!user && (!adminOnly || user.role === "admin");

  useEffect(() => {
    if (isLoading) return;
    if (isError || !isAllowed) {
      router.replace("/?auth=login"); // same behavior as your old middleware
    }
  }, [isLoading, isError, isAllowed, router]);

  if (isLoading || !isAllowed) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}