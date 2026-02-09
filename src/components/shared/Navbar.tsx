"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CiMenuFries } from "react-icons/ci";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import { ToggleButton } from "../ui/ToggleButton";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/auth";
import { ShoppingCart, ChevronDown, Pill } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import userLogo from "@/assets/images/user.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useAppSelector } from "@/redux/hook";
import { orderedMedicineSelector } from "@/redux/features/cartSlice";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const medicineCategories = [
  "Pain Relievers",
  "Antibiotics",
  "Antivirals",
  "Antifungals",
  "Allergy Medicines",
  "Digestive Medicines",
  "Cold & Flu",
  "Diabetes Medicines",
  "Blood Pressure Medicines",
  "Heart Medicines",
  "Mental Health",
  "Hormones & Steroids",
  "Skin Care",
  "Eye & Ear Care",
  "Cancer Medicines",
  "Vitamins & Supplements",
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Pain Relievers":
      return "💊";
    case "Antibiotics":
      return "🦠";
    case "Antivirals":
      return "🛡️";
    case "Antifungals":
      return "🍄";
    case "Allergy Medicines":
      return "🤧";
    case "Digestive Medicines":
      return "🫃";
    case "Cold & Flu":
      return "🤒";
    case "Diabetes Medicines":
      return "🩸";
    case "Blood Pressure Medicines":
      return "❤️";
    case "Heart Medicines":
      return "💓";
    case "Mental Health":
      return "🧠";
    case "Hormones & Steroids":
      return "⚗️";
    case "Skin Care":
      return "🧴";
    case "Eye & Ear Care":
      return "👁️";
    case "Cancer Medicines":
      return "🎗️";
    case "Vitamins & Supplements":
      return "💪";
    default:
      return "💊";
  }
};

export default function Navbar() {
  const { user, setIsLoading, contextLogout } = useUser();
  const cartItems = useAppSelector(orderedMedicineSelector);
  const pathname = usePathname();
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const linkList = [
    {
      name: "Dashboard",
      href: user?.role === "admin" ? "/dashboard/admin/overview" : "/dashboard/user/overview",
    },
    {
      name: "Announcement",
      href: "/announcement",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
    {
      name: (
        <div className="flex items-center gap-2">
          Cart
          <div className="relative">
            <ShoppingCart size={20} />
            {cartItems.length > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs"
              >
                {cartItems.length}
              </Badge>
            )}
          </div>
        </div>
      ),
      href: "/cart",
    }
  ];

  const handleLogOut = () => {
    logout();
    contextLogout();
    setIsLoading(true);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleShopMouseEnter = () => setIsShopMenuOpen(true);
  const handleShopMouseLeave = () => setIsShopMenuOpen(false);

  const handleMobileShopToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileShopOpen(!isMobileShopOpen);
  };

  const handleCategoryClick = () => {
    setIsMobileShopOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300`}
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

        <nav className="hidden items-center lg:gap-2 text-sm font-medium lg:flex">
          {/* Home Link */}
          <Button
            variant="link"
            effect={isActive("/") ? "underline" : "hoverUnderline"}
            className="md:p-1 lg:p-4"
          >
            <Link
              href="/"
              className={`${
                isActive("/")
                  ? "text-primary"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Home
            </Link>
          </Button>

          {/* Shop Mega Menu */}
          <div 
            className="relative"
            onMouseEnter={handleShopMouseEnter}
            onMouseLeave={handleShopMouseLeave}
          >
            <Button
              variant="link"
              effect={isActive("/shop") ? "underline" : "hoverUnderline"}
              className="md:p-1 lg:p-4"
            >
              <div className="flex items-center gap-1">
                <Link
                  href="/shop"
                  className={`${
                    isActive("/shop")
                      ? "text-primary"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  Shop
                </Link>
                <ChevronDown 
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    isShopMenuOpen && "rotate-180"
                  )} 
                />
              </div>
            </Button>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
              {isShopMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 z-50 w-screen max-w-4xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 rounded-lg mt-2"
                  style={{ left: '-200px' }}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                      <Pill className="h-6 w-6 text-blue-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Medicine Categories
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Browse medicines by category
                        </p>
                      </div>
                    </div>

                    {/* Categories Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {medicineCategories.map((category, index) => (
                        <motion.div
                          key={category}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.02 }}
                        >
                          <Link
                            href={`/shop?categories=${encodeURIComponent(category)}`}
                            className="group flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200 border border-transparent hover:border-blue-200 dark:hover:border-gray-600"
                            onClick={() => setIsShopMenuOpen(false)}
                          >
                            <span className="text-xl" role="img" aria-label={category}>
                              {getCategoryIcon(category)}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 truncate">
                                {category}
                              </p>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <Link
                          href="/shop"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200"
                          onClick={() => setIsShopMenuOpen(false)}
                        >
                          View All Medicines →
                        </Link>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {medicineCategories.length} categories available
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Other Navigation Links */}
          {linkList.map((link, index) => (
            <Button
              key={index}
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
          {/* Desktop Login/Logout */}
          {user ? (
            <Button onClick={handleLogOut} className="h-8 cursor-pointer hidden lg:flex">
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button effect="shine" className="h-8 cursor-pointer hidden lg:flex">
                Login
              </Button>
            </Link>
          )}

          <ToggleButton />

          {/* User Avatar Dropdown (Desktop) */}
          {user && (
            <DropdownMenu open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
              <DropdownMenuTrigger asChild className="hidden lg:flex">
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profileImage || userLogo.src} />
                  <AvatarFallback>
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user?.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/dashboard/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard/orders" className="w-full">
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/cart" className="w-full">
                    Cart ({cartItems.length})
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogOut} className="cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile Menu */}
          <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <DropdownMenuTrigger asChild>
              {user ? (
                <Avatar className="lg:hidden cursor-pointer">
                  <AvatarImage src={user?.profileImage || userLogo.src} />
                  <AvatarFallback>
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full lg:hidden"
                >
                                    <CiMenuFries className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 lg:hidden">
              {/* User Info Section (only show if logged in) */}
              {user && (
                <>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="w-[180px] truncate text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                </>
              )}

              <DropdownMenuItem>
                <Link
                  href="/"
                  className={`w-full ${
                    isActive("/")
                      ? "text-primary"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </DropdownMenuItem>

              {/* Mobile Shop Categories */}
              <div className="px-2 py-1">
                <button
                  onClick={handleMobileShopToggle}
                  className="flex items-center justify-between w-full px-2 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm transition-colors"
                >
                  <span className="text-sm font-medium">Shop Categories</span>
                  <ChevronDown 
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      isMobileShopOpen && "rotate-180"
                    )} 
                  />
                </button>
                
                {/* Mobile Categories List */}
                <AnimatePresence>
                  {isMobileShopOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden max-h-60 overflow-y-auto mt-2 space-y-1"
                    >
                      {medicineCategories.slice(0, 8).map((category) => (
                        <Link
                          key={category}
                          href={`/shop?categories=${encodeURIComponent(category)}`}
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm transition-colors"
                          onClick={handleCategoryClick}
                        >
                          <span className="text-sm">{getCategoryIcon(category)}</span>
                          <span className="truncate">{category}</span>
                        </Link>
                      ))}
                      <Link
                        href="/shop"
                        className="block px-4 py-2 text-blue-600 dark:text-blue-400 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm transition-colors"
                        onClick={handleCategoryClick}
                      >
                        View All Categories →
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Regular Mobile Menu Items */}
              {linkList.map((link) => (
                <DropdownMenuItem key={link.href}>
                  <Link
                    href={link.href}
                    className={`w-full ${
                      isActive(link.href)
                        ? "text-primary"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </DropdownMenuItem>
              ))}
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem>
                {user ? (
                  <Button 
                    onClick={() => {
                      handleLogOut();
                      setIsMobileMenuOpen(false);
                    }} 
                    className="h-8 cursor-pointer w-full"
                  >
                    Logout
                  </Button>
                ) : (
                  <Link href="/login" className="w-full">
                    <Button 
                      effect="shine" 
                      className="h-8 cursor-pointer w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
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
