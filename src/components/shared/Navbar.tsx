"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { CiMenuFries } from "react-icons/ci";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { ToggleButton } from "../ui/ToggleButton";

const linkList = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

type UserProps = {
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
};
export default function Navbar({ session }: { session: UserProps | null }) {
  const isScrollingDown = useScrollDirection();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };
  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-zinc-50 dark:bg-zinc-900 transition-transform duration-300 ${
        isScrollingDown ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="w-[90%] mx-auto flex h-16 justify-between">
        <Link
          href="/"
          className="flex items-center justify-center gap-4"
          prefetch={false}
        >
          <Image
            src={logo}
            alt="dark favicon"
            width={32}
            height={32}
            className="h-8 w-8"
          />

          <h1 className="text-xl font-bold">Ayan Kumar</h1>
        </Link>
        <nav className="hidden items-center gap-2 text-sm font-medium md:flex">
          {linkList.map((link) => (
            <Button
              key={link.name}
              variant="link"
              effect={isActive(link.href) ? "underline" : "hoverUnderline"}
              className="md:p-1 lg:p-4"
            >
              <Link
                href={link.href}
                className={`${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {link.name}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {session?.user ? (
            <Button onClick={()=> signOut()} className="h-8">Logout</Button>
          ) : (
            <Link href="/login">
              <Button effect="shine" className="h-8">Login</Button>
            </Link>
          )}

          <ToggleButton />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
              >
                <CiMenuFries className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
              <DialogDescription className="sr-only">
                This menu provides navigation links to different sections.
              </DialogDescription>
              <div className="grid gap-4 p-4">
                {linkList.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`${
                      isActive(link.href)
                        ? "text-primary-500 dark:text-primary-500"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
