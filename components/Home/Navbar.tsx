"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { t } = useLanguage();
  const isActive = (href: string) => pathname === href;

  const navLinks = [
    { label: t("nav.home", "Home"), href: "/" },
    { label: t("nav.destinations", "Destinations"), href: "/destinations", hasDropdown: true },
    { label: t("nav.trips", "Trips"), href: "/trips" },
    { label: t("nav.gallery", "Gallery"), href: "/gallery" },
    { label: t("nav.blogs", "Blogs"), href: "/blogs" },
    { label: t("nav.about", "About Us"), href: "/about" },
    { label: t("nav.contact", "Contact Us"), href: "/contact" },
  ];

  const { scrollY } = useScroll();
  const navShadow = useTransform(
    scrollY,
    [0, 60],
    ["0 0px 0px rgba(0,0,0,0)", "0 2px 12px rgba(0,0,0,0.10)"]
  );

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm"
      style={{ boxShadow: navShadow }}
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Mobile Language Switcher */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <img
                src="/images/home/hero/Logo.png"
                alt="logoipsum"
                className="h-7 w-auto object-contain"
              />
            </Link>
            <div className="md:hidden">
              <LanguageSwitcher variant="desktop" dropdownAlign="left" />
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-emerald-600 flex items-center gap-1 ${
                  isActive(link.href)
                    ? "text-emerald-600 border-b-2 border-emerald-600 pb-0.5"
                    : "text-gray-600"
                }`}
              >
                {link.label}
                {link.hasDropdown && (
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </Link>
            ))}
          </div>

          {/* Icons & Language Switcher */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/cart"
              className="text-gray-600 hover:text-emerald-600 transition-colors relative p-1"
              aria-label={t("nav.viewCart", "View booking cart")}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Language Switcher Dropdown */}
            <LanguageSwitcher variant="desktop" />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <Link
              href="/cart"
              className="text-gray-600 hover:text-emerald-600 relative p-1"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              className="text-gray-600 cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden overflow-hidden"
        initial={false}
        animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="bg-white border-t border-gray-100 px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm text-gray-700 hover:text-emerald-600 py-1"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/cart"
            className="block text-sm text-emerald-600 font-medium py-1"
            onClick={() => setMobileOpen(false)}
          >
            {t("nav.cart", "Booking Cart")} ({itemCount})
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
}
