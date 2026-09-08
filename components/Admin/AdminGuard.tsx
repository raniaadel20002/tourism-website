"use client";

import { useEffect, useState } from "react";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_access_token");

    if (token) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, []);

  // Still checking
  if (authorized === null) {
    return null;
  }

  // Not logged in → do NOT render admin at all
  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Access Denied
          </h2>

          <p className="text-gray-500">
            You are not authorized to access the Admin Dashboard.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
