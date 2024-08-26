import TopNavbar from "@/components/navs/top-navbar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="sm:p-12 p-6 sm:pt-24 pt-24">
        <TopNavbar />
        {children}
      </div>
    </SessionProvider>
  );
};

export default ProtectedLayout;