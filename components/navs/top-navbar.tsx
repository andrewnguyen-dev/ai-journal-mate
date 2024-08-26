"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Image from "next/image";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { logout } from "@/actions/logout";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Progress Diary", href: "/diary" },
  { name: "Reflection Report", href: "/reflection" },
];

export default function TopNavbar() {
  const pathname = usePathname();
  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-primary shadow">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center">
          <Image src="/wsu_logo.png" width={40} height={40} alt="Logo" />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`font-medium text-gray-50/80 transition-all hover:text-gray-50 ${pathname === item.href ? "text-white" : ""}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex cursor-pointer items-center gap-2 rounded-3xl pl-4 hover:bg-white/10">
              <span className="text-sm text-gray-50">22023226</span>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>AN</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href="#" className="flex items-center gap-2">
                <div className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="#" className="flex items-center gap-2">
                <div className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4" />
                <button onClick={handleLogout}>Logout</button>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" className="md:hidden">
              <Menu color="white" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-primary">
            <div className="mt-6 grid gap-3 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 text-lg font-medium text-gray-50/80 transition-all hover:text-gray-50 ${pathname === item.href ? "text-white" : ""}`}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-lg font-medium text-gray-50/80 transition-all hover:text-gray-50"
              >
                Logout
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
