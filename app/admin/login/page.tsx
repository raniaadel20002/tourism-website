"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { login } from "@/api/auth";
import LoginGuard from "@/components/Admin/LoginGuard";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login({ email, password });
      
      // Store in localStorage
      localStorage.setItem("admin_access_token", response.accessToken);
      localStorage.setItem("admin_refresh_token", response.refreshToken);
      localStorage.setItem("admin_role", response.role);

      // Redirect to Dashboard
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginGuard>
      <div className="h-screen w-screen overflow-hidden flex flex-col lg:flex-row bg-[#F8FAFC]">
        {/* Left Section - Hero/Background */}
      <div className="relative hidden lg:flex lg:w-1/2 bg-[#004560] flex-col justify-center px-16 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/home/hero/background.png"
            alt="Ocean background"
            fill
            className="object-cover opacity-60"
            priority
          />
          {/* Deep cyan gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#004560]/80 to-[#006993]/90mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-[#005B7F]/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-lg mt-auto mb-32">
          {/* Logo in Circle */}
          <div className="absolute -top-64 left-1/2 -translate-x-1/2 w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-2xl p-6">
            <div className="relative w-full h-full">
              <Image
                src="/images/Logo.png"
                alt="SunnySide Tours"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <p className="text-sm font-bold tracking-[0.2em] uppercase mb-4 text-[#E0F2FE]">
            Admin Workspace
          </p>
          <h1 className="text-5xl font-bold leading-tight mb-6 text-white">
            Manage travel experiences with clarity.
          </h1>
          <p className="text-lg text-[#E0F2FE] leading-relaxed max-w-md">
            Secure access for keeping tours, content, and daily operations in one calm dashboard.
          </p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-0">
        
        {/* Mobile Logo (hidden on desktop) */}
        <div className="lg:hidden mb-12 relative w-40 h-20">
           <Image src="/images/Logo.png" alt="SunnySide Tours" fill className="object-contain" />
        </div>

        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          <div className="mb-8">
            <p className="text-[#006993] text-xs font-bold tracking-widest uppercase mb-2">
              Welcome back
            </p>
            <h2 className="text-3xl font-bold text-[#004560] mb-3">Sign in</h2>
            <p className="text-gray-500 text-sm">
              Use your admin account to access the dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#004560]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006993]/20 focus:border-[#006993] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#004560]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006993]/20 focus:border-[#006993] transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="flex justify-end pt-1">
                <a href="#" className="text-sm font-semibold text-[#006993] hover:text-[#004560]">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#006993] hover:bg-[#005B7F] text-white font-semibold py-3.5 px-4 rounded-lg transition-colors flex justify-center items-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <LoginArrowIcon className="w-5 h-5" />
                  <span>Sign in</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
    </LoginGuard>
  );
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function EyeIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function EyeSlashIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );
}

function LoginArrowIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
    </svg>
  );
}
