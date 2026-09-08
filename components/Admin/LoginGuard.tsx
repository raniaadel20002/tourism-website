"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface LoginGuardProps {
  children: React.ReactNode;
}

/**
 * LoginGuard – wraps the admin login page.
 * If the user already has a valid access token they are redirected to the
 * admin dashboard so they don't land on the login form again.
 */
export default function LoginGuard({ children }: LoginGuardProps) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_access_token");
    if (token) {
      router.replace("/admin");
    } else {
      setChecked(true);
    }
  }, [router]);

  if (!checked) {
    // Avoid flashing the login form while we check localStorage
    return null;
  }

  return <>{children}</>;
}
