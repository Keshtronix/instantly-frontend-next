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

  const { data, isLoading,isFetching, isError, error, refetch } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    retry: 1,
     refetchOnMount: "always",
  });

  const user = data?.user;
  const isPending = isLoading || (isFetching && !user);
  const status = (error as any)?.response?.status;
  const isUnauthorized = status === 401 || (!isError && !user);
  const isAllowed = !!user && (!adminOnly || user.isAdmin === true);

  useEffect(() => {
   if (isPending) return;
    if (isUnauthorized || (user && !isAllowed)) {
      router.replace("/?auth=login");
    }
  }, [isPending, isUnauthorized, user, isAllowed, router]);

  if (isPending) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (isError && !isUnauthorized) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-sm">
        <p>Couldn't reach the server.</p>
        <button className="underline" onClick={() => refetch()}>
          Try again
        </button>
      </div>
    );
  }

  if (!isAllowed) return null;

  return <>{children}</>;
}