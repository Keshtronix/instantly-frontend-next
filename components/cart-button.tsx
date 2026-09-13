"use client"

import { useEffect, useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

const CartButton = () => {
  const [mounted, setMounted] = useState(false);
  const cartCount = useCart((state) => state.cartCount());
  const setIsCartOpen = useCart((state) => state.setIsCartOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayCount = mounted ? cartCount : 0;

  return (
    <button
      type="button"
      onClick={() => setIsCartOpen(true)}
      className="relative flex shrink-0 items-center gap-2 rounded-lg px-2 py-1.5 text-foreground transition hover:bg-[var(--grey100)]"
    >
      <span className="relative">
        <ShoppingCart className="size-7 stroke-[2.3]" />
        <span
          className={cn(
            "absolute -right-3 -top-2 grid h-5 min-w-6 place-items-center rounded-full px-1.5 text-xs font-bold leading-none text-primary-foreground",
            "bg-foreground"
          )}
        >
          {displayCount}
        </span>
      </span>
      <span className="hidden text-sm font-bold sm:block">Cart</span>
    </button>
  );
};

export default CartButton;