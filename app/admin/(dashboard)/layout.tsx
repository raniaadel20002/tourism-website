import Sidebar from "@/components/Admin/Sidebar";
import AdminGuard from "@/components/Admin/AdminGuard";
import { AdminModalProvider } from "@/context/AdminModalContext";
import { ToastProvider } from "@/context/ToastContext";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGuard>
      <ToastProvider>
        <AdminModalProvider>
          <div className="min-h-screen bg-[#F8FAFC]">
            <Sidebar />
            <main className="ml-64 p-8 min-h-screen">
              {children}
            </main>
          </div>
        </AdminModalProvider>
      </ToastProvider>
    </AdminGuard>
  );
}
