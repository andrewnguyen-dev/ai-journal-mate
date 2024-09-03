import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Journal Bot",
  description:
    "A bot that helps you keep track of your journal entries - developed by Rhys and Andrew",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          position="bottom-left"
          toastOptions={{
            style: {
              padding: "12px",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
