"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  ShoppingCart,
  LogIn,
  Bell,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useScroll } from "@/hooks/use-scroll";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { DashboardIcon } from "@radix-ui/react-icons";

const navigation = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about-us" },
  { name: "Our Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "/contact" },
];

export function LandingHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount] = useState(3); // Example cart count
  const session = useSession();
  const scroll = useScroll();

  return (
    <header
      id="home"
      className={`top-0 z-50 w-full bg-primary backdrop-blur transition-all duration-300 supports-[backdrop-filter]:bg-white/60 ${!scroll ? "block py-2" : "sticky shadow-lg"}`}
    >
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image src="/icon.png" alt="Icon" width={50} height={50} />
          <span className="whitespace-nowrap bg-gradient-to-tr from-blue-500 to-pink-500 bg-clip-text font-mono text-sm font-bold text-transparent md:text-xl">
            Tasker Company
          </span>
        </Link>
        <nav className="hidden md:flex md:flex-1">
          <ul className="flex items-center">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`${buttonVariants({
                    variant: "ghost",
                    effect: "hoverUnderline",
                  })} hover:bg-transparent`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-1">
          <div className="hidden gap-1 md:flex">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center"
                >
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-[150px] md:w-[250px] lg:w-[300px]"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="relative"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[10px]"
            >
              {cartCount}
            </Badge>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
                <span className="absolute -right-1 -top-1 flex h-2 w-2 rounded-full bg-primary"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-auto">
                {[...Array(5)].map((_, i) => (
                  <DropdownMenuItem
                    key={i}
                    className="flex flex-col items-start"
                  >
                    <div className="font-medium">New product arrival</div>
                    <div className="text-sm text-muted-foreground">
                      Check out our latest collection!
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{`${
                      5 - i
                    } hour${i !== 4 ? "s" : ""} ago`}</div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center">
                <Link href="/notifications" className="w-full text-primary">
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="hidden items-center space-x-2 md:flex">
            {session.data?.token ? (
              <Link
                href="/dashboard"
                className={buttonVariants({ variant: "secondary" })}
              >
                <DashboardIcon className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            ) : (
              <a
                href="/login"
                className={buttonVariants({ variant: "secondary" })}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </a>
            )}
            <Button size="sm" effect="shineHover">
              <Download className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <MobileNav session={session} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MobileNav({ session }: { session: any }) {
  return (
    <div className="flex flex-col space-y-3 px-2 text-base">
      {navigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="rounded-md px-4 py-2 font-medium transition-colors hover:bg-accent"
        >
          {item.name}
        </a>
      ))}
      <Separator />
      {session.data?.token ? (
        <Link
          href="/dashboard"
          className={buttonVariants({ variant: "ghost" })}
        >
          <DashboardIcon className="mr-2 h-4 w-4" />
          Dashboard
        </Link>
      ) : (
        <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Link>
      )}
      <Button size="sm" effect="shineHover">
        <Download className="mr-2 h-4 w-4" />
        Profile
      </Button>
    </div>
  );
}
