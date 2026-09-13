import "server-only";
import { cookies } from "next/headers";

export type Session = {
  userId: string;
  email: string;
  role: "user" | "admin";
  user: {
    _id: string;
    email: string;
    phone: string | null;
    avatar: string | null;
    isAdmin: boolean;
  };
};

export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get("instant_access_token")?.value;
  if (!token) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}auth/status`, {
      headers: { Cookie: `instant_access_token=${token}` },
      cache: "no-store", // never cache auth checks
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    // API unreachable / network error — fail closed, not logged in
    return null;
  }
}

export async function requireSession(): Promise<Session> {
  const session = await getSession();
  if (!session) {
    const { redirect } = await import("next/navigation");
    redirect("/");
  }
  return session;
}