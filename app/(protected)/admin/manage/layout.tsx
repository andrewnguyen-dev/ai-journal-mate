import { RoleGate } from "@/components/auth/role-gate";
import { AdminSidebarNav } from "@/components/navs/admin-sidebar-nav";
import { adminSidebarNavItems } from "@/lib/constants";

export default function AdminManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGate allowedRole="ADMIN">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <AdminSidebarNav items={adminSidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </RoleGate>
  );
}
