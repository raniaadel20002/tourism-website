"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

function PhoneIcon() {
  return (
    <svg
      className="w-5 h-5 text-[#004560] flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      className="w-5 h-5 text-[#004560] flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9 9 0 100-18 9 9 0 000 18z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.6 9h16.8M3.6 15h16.8"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.5 3a17 17 0 000 18M12.5 3a17 17 0 010 18"
      />
    </svg>
  );
}

function LocationPinIcon() {
  return (
    <svg
      className="w-5 h-5 text-[#004560] flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      className="w-6 h-6 fill-[#004560] hover:fill-[#006993] transition-colors"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      className="w-6 h-6 text-[#004560] hover:text-[#006993] transition-colors"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      className="w-6 h-6 fill-[#004560] hover:fill-[#006993] transition-colors"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.79a8.27 8.27 0 004.83 1.54V6.88a4.85 4.85 0 01-1.06-.19z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      className="w-6 h-6 fill-[#004560] hover:fill-[#006993] transition-colors"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Facebook", icon: <FacebookIcon />, href: "#" },
  { label: "Instagram", icon: <InstagramIcon />, href: "#" },
  { label: "TikTok", icon: <TikTokIcon />, href: "#" },
  { label: "X", icon: <XIcon />, href: "#" },
];

/* ─── Framer Motion Variants ─── */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13 },
  },
};

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { label: t("nav.home", "Home"), href: "/" },
    { label: t("nav.destinations", "Destinations"), href: "/destinations", hasDropdown: true },
    { label: t("nav.trips", "Trips"), href: "/trips" },
    { label: t("nav.gallery", "Gallery"), href: "/gallery" },
    { label: t("nav.about", "About Us"), href: "/about" },
    { label: t("nav.blogs", "Blogs"), href: "/blogs" },
    { label: t("nav.contact", "Contact Us"), href: "/contact" },
  ];

  return (
    <footer className="bg-[#006993] pt-10 sm:pt-14 pb-8 px-4 sm:px-6 lg:px-10 overflow-hidden">
      <div className="max-w-[1320px] mx-auto">
        
        {/* ── Large white rounded container ── */}
        <motion.div
          className="bg-white rounded-3xl sm:rounded-[36px] lg:rounded-[48px] px-8 sm:px-12 lg:px-16 py-10 sm:py-12 lg:py-14 shadow-lg"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >

          <motion.div
            className="flex flex-col sm:flex-row flex-wrap lg:flex-nowrap justify-between gap-10 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            
            {/* ── Column 1: Logo + Description ── */}
            <motion.div variants={columnVariants} className="w-full sm:w-[45%] lg:w-[28%] flex flex-col items-start">
              <div className="mb-5">
                <Image
                  src="/images/home/Footer/Logo.png"
                  alt="logoipsum"
                  width={160}
                  height={38}
                  className="h-auto w-36 sm:w-40 object-contain"
                />
              </div>
              <p className="font-roboto text-[#000C09] text-xs sm:text-sm leading-relaxed max-w-[260px]">
                {t("footer.description", "Every journey is an opportunity to explore, relax, and create unforgettable memories crafted with care, comfort, and local expertise.")}
              </p>
            </motion.div>

            {/* ── Column 2: Quick Action Links ── */}
            <motion.div variants={columnVariants} className="w-full sm:w-[45%] lg:w-[22%] flex flex-col items-start">
              <h3 className="font-roboto font-semibold text-[#004560] text-base sm:text-lg mb-4 sm:mb-5">
                {t("footer.quickAction", "Quick action")}
              </h3>
              <ul className="flex flex-col gap-2.5 sm:gap-3">
                {quickLinks.map(({ label, href, hasDropdown }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="font-roboto text-[#000C09] hover:text-[#006993] text-xs sm:text-sm transition-colors duration-150 inline-flex items-center gap-1.5"
                    >
                      <span>{label}</span>
                      {hasDropdown && (
                        <svg
                          className="w-3.5 h-3.5 text-[#000C09]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ── Column 3: Contact Us ── */}
            <motion.div variants={columnVariants} className="w-full sm:w-[45%] lg:w-[26%] flex flex-col items-start">
              <h3 className="font-roboto font-semibold text-[#004560] text-base sm:text-lg mb-4 sm:mb-5">
                {t("footer.contactUs", "Contact Us")}
              </h3>
              <ul className="flex flex-col gap-4 sm:gap-5">
                <li className="flex items-center gap-3">
                  <PhoneIcon />
                  <span className="font-roboto text-[#000C09] text-xs sm:text-sm">
                    {t("footer.phone", "+00 (123) 456 889")}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <GlobeIcon />
                  <span className="font-roboto text-[#000C09] text-xs sm:text-sm">
                    {t("footer.email", "contact@example.com")}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <LocationPinIcon />
                  <span className="font-roboto text-[#000C09] text-xs sm:text-sm leading-relaxed">
                    {t("footer.address", "583 Main Street, NY, USA")}
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* ── Column 4: Follow Us + Social Icons ── */}
            <motion.div variants={columnVariants} className="w-full sm:w-[45%] lg:w-[20%] flex flex-col items-start">
              <h3 className="font-roboto font-semibold text-[#004560] text-base sm:text-lg mb-4 sm:mb-5">
                {t("footer.followUs", "Follow Us")}
              </h3>
              <div className="flex items-center gap-4 sm:gap-5">
                {socialLinks.map(({ label, icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="inline-flex items-center justify-center transition-transform hover:scale-110 duration-200"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </motion.div>

          </motion.div>

        </motion.div>

        {/* ── Copyright Text Below Container ── */}
        <motion.div
          className="mt-6 sm:mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <p className="font-roboto text-white text-xs sm:text-[13px] tracking-wide">
            {t("footer.copyright", "Powered By Tech Gear Solutions © 2026 All Rights Reserved")}
          </p>
        </motion.div>

      </div>
    </footer>
  );
}
