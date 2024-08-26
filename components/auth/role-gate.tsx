'use client'

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const currentRole = useCurrentRole();

  if (currentRole !== allowedRole) {
    return (
      // Considering using 404 page instead, for security reasons
      <div className="flex h-[70vh] w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-3xl font-bold">Access Denied</h1>
          <p className="text-lg text-muted-foreground">
            You do not have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};