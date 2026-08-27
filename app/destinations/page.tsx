"use client";

import DestinationsHero from "@/components/Destinations/DestinationsHero";
import Breadcrumb from "@/components/Breadcrumb";
import DestinationsGrid from "@/components/Destinations/DestinationsGrid";
import { useLanguage } from "@/context/LanguageContext";

export default function DestinationsPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white flex flex-col overflow-x-clip">

      {/* ── Destinations Hero Section ─────────────────────────────── */}
      <DestinationsHero />

      {/* ── Breadcrumb Navigation ─────────────────────────────────── */}
      <Breadcrumb items={[{ label: t("nav.home", "Home"), href: "/" }, { label: t("nav.destinations", "Destinations") }]} />

      {/* ── Destinations Cards Grid ───────────────────────────────── */}
      <DestinationsGrid />

    </main>
  );
}
