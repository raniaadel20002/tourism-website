"use client";

import { useState, useMemo, useEffect } from "react";
import { getTrips, type Trip as ApiTrip } from "@/api/trips";
import { transformApiTripsToUi } from "@/utils/tripTransform";
import TripsHero from "@/components/Trips/TripsHero";
import Breadcrumb from "@/components/Breadcrumb";
import TripsFilterSidebar from "@/components/Trips/TripsFilterSidebar";
import TripsResults from "@/components/Trips/TripsResults";
import { useLanguage } from "@/context/LanguageContext";

export default function TripsPage() {
  const { t, language } = useLanguage();
  const [apiTrips, setApiTrips] = useState<ApiTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("All");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedType, setSelectedType] = useState("All Trips");
  const [sortBy, setSortBy] = useState("Latest");
  const [filterMobileOpen, setFilterMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get("type");

      if (typeParam) {
        setSelectedType(typeParam);
      }
    }
  }, []);

  useEffect(() => {
    async function fetchTrips() {
      try {
        setLoading(true);

        const data = await getTrips(undefined, 1, 100, {
          lang: language,
        });

        setApiTrips(data.filter((trip) => trip.isActive));
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch trips"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchTrips();
  }, [language]);

  const availableDestinations = useMemo(() => {
    const destinations = new Set<string>();

    apiTrips.forEach((trip) => {
      if (trip.destinationInfo?.name) {
        destinations.add(trip.destinationInfo.name);
      }
    });

    return Array.from(destinations).sort();
  }, [apiTrips]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedDestination("All");
    setMinPrice("0");
    setMaxPrice("");
    setSelectedType("All Trips");
    setSortBy("Latest");
  };

  const filteredTrips = useMemo(() => {
    const filtered = apiTrips
      .filter((trip) => {
        const query = searchQuery.trim().toLowerCase();

        if (
          query &&
          !trip.name?.toLowerCase().includes(query) &&
          !trip.destinationInfo?.name?.toLowerCase().includes(query) &&
          !trip.tripTypeName?.toLowerCase().includes(query)
        ) {
          return false;
        }

        if (
          selectedDestination !== "All" &&
          trip.destinationInfo?.name?.toLowerCase() !==
            selectedDestination.toLowerCase()
        ) {
          return false;
        }

        const min = parseFloat(minPrice) || 0;
        const max = maxPrice.trim()
          ? parseFloat(maxPrice)
          : Infinity;

        if (trip.adultPrice < min || trip.adultPrice > max) {
          return false;
        }

        if (
          selectedType !== "All Trips" &&
          trip.tripTypeName?.toLowerCase() !== selectedType.toLowerCase()
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "PriceLowHigh") {
          return a.adultPrice - b.adultPrice;
        }

        if (sortBy === "PriceHighLow") {
          return b.adultPrice - a.adultPrice;
        }

        return 0;
      });

    return transformApiTripsToUi(filtered);
  }, [
    apiTrips,
    searchQuery,
    selectedDestination,
    minPrice,
    maxPrice,
    selectedType,
    sortBy,
  ]);

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <TripsHero />

      <Breadcrumb
        items={[
          {
            label: t("nav.home", "Home"),
            href: "/",
          },
          {
            label: t("nav.trips", "Explore"),
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#006993] border-r-transparent" />
              <p className="mt-4 text-gray-600">
                {t("trips.loading", "Loading trips...")}
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>

              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-[#006993] text-white rounded-lg hover:bg-[#004560]"
              >
                {t("trips.tryAgain", "Try Again")}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10">
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
              availableDestinations={availableDestinations}
            />

            <TripsResults
              trips={filteredTrips}
              tripCount={filteredTrips.length}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              filterMobileOpen={filterMobileOpen}
              onToggleMobileFilter={() =>
                setFilterMobileOpen((previous) => !previous)
              }
              onClearFilters={clearAllFilters}
            />
          </div>
        )}
      </div>
    </main>
  );
}