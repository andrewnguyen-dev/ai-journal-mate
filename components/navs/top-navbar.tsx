"use client";

import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { logout } from '@/actions/logout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCurrentUser } from '@/hooks/use-current-user';
import { navItemsAdmin, navItemsStudent, navItemsSupervisor } from '@/lib/constants';

export default function TopNavbar() {
  const pathname = usePathname();
  const handleLogout = async () => {
    await logout();
  };
  const user = useCurrentUser();

  const navItems =
    user?.role === "STUDENT"
      ? navItemsStudent
      : user?.role === "SUPERVISOR"
        ? navItemsSupervisor
        : navItemsAdmin;

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
        <div className="flex items-center">
          {user?.role !== "STUDENT" && (
            <span className="flex h-6 items-center rounded-lg bg-rose-50 px-2 text-xs">
              {user?.role}
            </span>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl pl-4 hover:bg-white/10">
                <span className="text-sm text-gray-50">{user?.studentId}</span>
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
        </div>

        {/* Navigation menu for mobile */}
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
