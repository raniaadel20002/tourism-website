import Sidebar from "@/components/Admin/Sidebar";
import AdminGuard from "@/components/Admin/AdminGuard";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#F8FAFC]">
        <Sidebar />
        <main className="ml-64 p-8 min-h-screen">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}

