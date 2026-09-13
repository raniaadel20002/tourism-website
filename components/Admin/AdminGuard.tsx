"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { currentLanguageInfo } = useLanguage();
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_access_token");

    if (token) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, []);

  // Listen for 401 events dispatched by any admin API call.
  // When a genuine 401 occurs the token is expired/invalid, so we clear
  // it and redirect through the existing login flow.
  useEffect(() => {
    const handle401 = () => {
      localStorage.removeItem("admin_access_token");
      setAuthorized(false);
      router.replace("/admin/login");
    };

    window.addEventListener("admin:401", handle401);
    return () => window.removeEventListener("admin:401", handle401);
  }, [router]);

  // Still checking
  if (authorized === null) {
    return null;
  }

  // Not logged in → do NOT render admin at all
  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Page Not Found
          </h2>

          <p className="text-gray-500">
            The page you are looking for does not exist.
          </p>
          <Link
            href={`/${currentLanguageInfo?.code}`}
            className="px-6 py-2 bg-[#006993] text-white rounded-lg hover:bg-[#004560] inline-block mt-4"
          >
            Back to Home Page
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

