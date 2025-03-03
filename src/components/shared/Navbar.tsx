"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CiMenuFries } from "react-icons/ci";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import { ToggleButton } from "../ui/ToggleButton";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import userLogo from "@/assets/images/user.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
    href: "/dashboard/profile",
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

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const isScrollingDown = useScrollDirection();
  const pathname = usePathname();

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
  };

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

          <h1 className="text-xl font-bold">MediMart</h1>
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
          {user ? (
            <Button onClick={handleLogOut} className="h-8 cursor-pointer hidden md:flex">
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button effect="shine" className="h-8 cursor-pointer hidden md:flex">
                Login
              </Button>
            </Link>
          )}

          <ToggleButton />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {user ? (
                <Avatar>
                  <AvatarImage src={userLogo.src} />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full md:hidden"
                >
                  <CiMenuFries className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 md:hidden">
              {linkList.map((link) => (
                <DropdownMenuItem key={link.name}>
                  <Link
                    href={link.href}
                    className={`w-full ${
                      isActive(link.href)
                        ? "text-primary"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {link.name}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem>
                {user ? (
                  <Button onClick={handleLogOut} className="h-8 cursor-pointer">
                    Logout
                  </Button>
                ) : (
                  <Link href="/login">
                    <Button effect="shine" className="h-8 cursor-pointer">
                      Login
                    </Button>
                  </Link>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
