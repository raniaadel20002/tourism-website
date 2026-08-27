"use client";

import { useState, useMemo } from "react";
import { allTripsData } from "@/data/trips";
import TripsHero from "@/components/Trips/TripsHero";
import Breadcrumb from "@/components/Breadcrumb";
import TripsFilterSidebar from "@/components/Trips/TripsFilterSidebar";
import TripsResults from "@/components/Trips/TripsResults";

import { useLanguage } from "@/context/LanguageContext";

export default function TripsPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("All");
  const [minPrice, setMinPrice] = useState("20");
  const [maxPrice, setMaxPrice] = useState("100");
  const [selectedType, setSelectedType] = useState<string>("Safari Trips");
  const [sortBy, setSortBy] = useState("Latest");
  const [filterMobileOpen, setFilterMobileOpen] = useState(false);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedDestination("All");
    setMinPrice("20");
    setMaxPrice("100");
    setSelectedType("All Trips");
    setSortBy("Latest");
  };

  const filteredTrips = useMemo(() => {
    return allTripsData
      .filter((trip) => {
        if (
          searchQuery.trim() &&
          !trip.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !trip.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !trip.category.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        if (
          selectedDestination !== "All" &&
          trip.location.toLowerCase() !== selectedDestination.toLowerCase()
        ) {
          return false;
        }
        const min = parseFloat(minPrice) || 0;
        const max = parseFloat(maxPrice) || Infinity;
        if (trip.price < min || trip.price > max) return false;
        if (selectedType !== "All Trips" && trip.tripTypeTag !== selectedType) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "PriceLowHigh") return a.price - b.price;
        if (sortBy === "PriceHighLow") return b.price - a.price;
        if (sortBy === "Rating") return b.rating - a.rating;
        return 0;
      });
  }, [searchQuery, selectedDestination, minPrice, maxPrice, selectedType, sortBy]);

  return (
    <main className="min-h-screen bg-white flex flex-col">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <TripsHero />

      {/* ── Breadcrumb ───────────────────────────────────────────── */}
      <Breadcrumb items={[{ label: t("nav.home", "Home"), href: "/" }, { label: t("nav.trips", "Explore") }]} />

      {/* ── Main Content Area ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10">

          {/* Left Sidebar Filter */}
          <TripsFilterSidebar
            selectedDestination={selectedDestination}
            onDestinationChange={setSelectedDestination}
            minPrice={minPrice}
            onMinPriceChange={setMinPrice}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            onClearAll={clearAllFilters}
            isOpen={filterMobileOpen}
          />

          {/* Right Results Area */}
          <TripsResults
            trips={filteredTrips}
            tripCount={filteredTrips.length}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            filterMobileOpen={filterMobileOpen}
            onToggleMobileFilter={() => setFilterMobileOpen((p) => !p)}
            onClearFilters={clearAllFilters}
          />

        </div>
      </div>

    </main>
  );
}
