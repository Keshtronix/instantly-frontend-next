"use client";

import Banner from "@/components/banner";
import CartSheet from "@/components/cart-sheet";
import Footer from "@/components/footer";
import Nav from "@/components/nav";
import { AuthDialog } from "@/components/auth-dialog";

import { useEffect } from "react";
import { useUser } from "@/hooks/use-user";
import { useCart } from "@/hooks/use-cart";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user } = useUser();
  const fetchCart = useCart((state) => state.fetchCart);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  return (
    <>
      <Banner />
      <Nav />
      <main className="min-h-0 w-full max-width mx-auto px-4 lg:px-0 flex-1">
        {children}
      </main>

      <Footer />
      <CartSheet />
      <AuthDialog />
    </>
  );
}
