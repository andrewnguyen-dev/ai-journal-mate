/**
 * v0 by Vercel.
 * @see https://v0.dev/t/fvXy2y9gO1w
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
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
import { JSX, SVGProps } from "react";
import Image from "next/image";
import { signOut } from "@/auth";
import { Menu } from "lucide-react";

const navItems = [
  { name: "Home", href: "#" },
  { name: "Progress Diary", href: "#" },
  { name: "Reflection Report", href: "#" },
];

export default async function TopNavbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-primary shadow">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center">
          <Image src="/wsu_logo.png" width={40} height={40} alt="Logo" />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-medium text-gray-50/80 transition-all hover:text-gray-50"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex cursor-pointer items-center gap-2 pl-4 hover:bg-white/10 rounded-3xl">
              <span className="text-sm text-gray-50">22023226</span>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>JD</AvatarFallback>
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
                <form
                  action={async () => {
                    "use server";
                    await signOut({
                      redirectTo: "/auth/login",
                    });
                  }}
                >
                  <button type="submit">Logout</button>
                </form>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" className="lg:hidden">
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
                  className="flex items-center gap-2 text-lg font-medium text-gray-50/80 transition-all hover:text-gray-50"
                >
                  {item.name}
                </Link>
              ))}
              <form
                action={async () => {
                  "use server";
                  await signOut({
                    redirectTo: '/auth/login',
                  });
                }}
              >
                <button
                  type="submit"
                  className="flex items-center gap-2 text-lg font-medium text-gray-50/80 transition-all hover:text-gray-50"
                >
                  Logout
                </button>
              </form>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
