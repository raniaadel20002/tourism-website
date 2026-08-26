"use client";

import AboutHero from "@/components/About/AboutHero";
import AboutBreadcrumb from "@/components/About/AboutBreadcrumb";
import AboutCompany from "@/components/About/AboutCompany";
import AboutWhatWeOffer from "@/components/About/AboutWhatWeOffer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col overflow-x-clip">

      {/* ── Hero Section with Dark Blue Background ────────────────── */}
      <AboutHero />

      {/* ── Breadcrumb ───────────────────────────────────────────── */}
      <AboutBreadcrumb />

      {/* ── Main Content Section ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16 w-full flex-1 flex flex-col">
        
        {/* Your Journey Begins With Us Intro */}
        <div className="max-w-5xl mb-12 sm:mb-16">
          <h2 className="font-roboto font-medium text-[#000C09] text-2xl sm:text-3xl md:text-[32px] mb-3 sm:mb-4">
            Your Journey Begins With Us
          </h2>
          <p className="font-roboto font-normal text-[#484848] text-sm sm:text-base md:text-[16px] leading-relaxed max-w-4xl">
            We create unforgettable travel experiences that bring you closer to the heart of Egypt. From crystal-clear Red Sea adventures and thrilling desert safaris to iconic historical landmarks and scenic Nile cruises, every journey is carefully designed to inspire, excite, and leave you with memories that last a lifetime.
          </p>
        </div>

        {/* ── About Our Company ─────────────────────────────────── */}
        <AboutCompany />

        {/* ── What We Offer? ───────────────────────────────────── */}
        <AboutWhatWeOffer />

      </div>
    </main>
  );
}
