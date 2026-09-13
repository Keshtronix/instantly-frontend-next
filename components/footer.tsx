import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { PUBLIC_ROUTES } from "@/constants/routes";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-8 border-t border-border bg-background">
      <section className="rounded-t-[2rem] bg-[var(--grey100)] px-4 py-14 text-center">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
          <Logo showText={false} className="[&_div]:size-10" />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold text-foreground">
              There&apos;s more to explore
            </h2>
            <p className="text-base text-muted-foreground">
              Shop fresh groceries, pantry staples, and everyday essentials.
            </p>
          </div>
          <Button asChild className="mt-3 h-11 rounded-full px-8 text-base">
            <Link href={PUBLIC_ROUTES.PRODUCTS}>View all products</Link>
          </Button>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-4 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <Logo />
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href={PUBLIC_ROUTES.ABOUT} className="hover:text-foreground">
            About
          </Link>
          <Link href={PUBLIC_ROUTES.PRIVACY} className="hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href={PUBLIC_ROUTES.TERMS} className="hover:text-foreground">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;