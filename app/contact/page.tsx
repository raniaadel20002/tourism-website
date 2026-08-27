"use client";

import ContactHero from "@/components/Contact/ContactHero";
import Breadcrumb from "@/components/Breadcrumb";
import ContactForm from "@/components/Contact/ContactForm";
import ContactMapAndSocials from "@/components/Contact/ContactMapAndSocials";
import ContactInfoBar from "@/components/Contact/ContactInfoBar";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white flex flex-col overflow-x-clip">

      {/* ── Hero Section ─────────────────────────────────────────── */}
      <ContactHero />

      {/* ── Breadcrumb ───────────────────────────────────────────── */}
      <Breadcrumb items={[{ label: t("nav.home", "Home"), href: "/" }, { label: t("nav.contact", "Contact Us") }]} />

      {/* ── Main Content ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 w-full flex-1 flex flex-col">

        {/* Two-Column Row: Form Left + Map Right */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-10 lg:gap-12 mb-12 sm:mb-16">
          <ContactForm />
          <ContactMapAndSocials />
        </div>

        {/* Contact Information Bottom Card */}
        <ContactInfoBar />

      </section>
    </main>
  );
}
