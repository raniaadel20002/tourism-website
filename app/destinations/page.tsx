"use client";

import DestinationsHero from "@/components/Destinations/DestinationsHero";
import Breadcrumb from "@/components/Breadcrumb";
import DestinationsGrid from "@/components/Destinations/DestinationsGrid";

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col overflow-x-clip">

      {/* ── Destinations Hero Section ─────────────────────────────── */}
      <DestinationsHero />

      {/* ── Breadcrumb Navigation ─────────────────────────────────── */}
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Destinations" }]} />

      {/* ── Destinations Cards Grid ───────────────────────────────── */}
      <DestinationsGrid />

    </main>
  );
}
