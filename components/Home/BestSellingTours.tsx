"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import TourCard from "@/components/Home/TourCard";
import { getTrips, Trip } from "@/api/trips";

const filterTabs = [
  "All Tours",
  "Snorkelling",
  "Diving",
  "Safari",
  "Over day",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function BestSellingTours() {
  const [activeTab, setActiveTab] = useState("All Tours");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  // Fetch trips from API
  useEffect(() => {
    async function fetchTrips() {
      try {
        setLoading(true);
        // Fetch active trips only (includeInactive: false by default)
        const data = await getTrips(undefined, 1, 20);
        // Filter to only active trips
        const activeTrips = data.filter(trip => trip.isActive);
        setTrips(activeTrips);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load tours");
        console.error("Failed to fetch trips:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTrips();
  }, []);

  // Filter trips based on active tab
  const filteredTours = activeTab === "All Tours"
    ? trips
    : trips.filter((trip) => {
        const tripTypeLower = trip.tripTypeName?.toLowerCase() || "";
        
        if (activeTab === "Snorkelling") {
          return tripTypeLower.includes("snorkel") || tripTypeLower.includes("sea");
        }
        if (activeTab === "Diving") {
          return tripTypeLower.includes("div") || tripTypeLower.includes("sea");
        }
        if (activeTab === "Safari") {
          return tripTypeLower.includes("safari") || tripTypeLower.includes("desert");
        }
        if (activeTab === "Over day") {
          return tripTypeLower.includes("day") || tripTypeLower.includes("historical");
        }
        return true;
      });

  return (
    <section className="relative bg-[#13445d] py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decorative Shape from heart.svg */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <img
          src="/images/home/bestselling/heart.svg"
          alt=""
          className="w-full h-full object-cover object-center max-w-[1550px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div
          className="flex flex-col items-center text-center mb-6 sm:mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants as Variants}
        >
          {/* Small Title */}
          <span className="font-montez text-[#69DD84] text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight mb-1 tracking-wide">
            {t("bestselling.subtitle", "Explore Tours")}
          </span>

          {/* Main Title */}
          <h2 className="font-roboto text-[#FDFEFF] text-2xl sm:text-3xl lg:text-[36px] font-semibold tracking-tight mb-2.5">
            {t("bestselling.title", "Best-Selling Tours")}
          </h2>

          {/* Decorative Underline */}
          <div className="w-16 sm:w-20 h-1 sm:h-1.5 bg-[#69DD84] rounded-full" />
        </motion.div>

        {/* Filter Controls + View More Bar */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-2.5">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-roboto font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#69DD84] text-white shadow-md scale-100 font-semibold"
                      : "bg-white text-[#4A5568] hover:bg-gray-100 hover:scale-105 shadow-sm"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* View More Button */}
          <Link
            href="/trips"
            className="flex-shrink-0 border border-[#FDFEFF] text-[#FDFEFF] hover:bg-white hover:text-[#003A5A] font-roboto font-medium text-xs sm:text-sm px-5 sm:px-6 py-1.5 sm:py-2 rounded-full transition-all duration-300"
          >
            {t("bestselling.moreTours", "View More")}
          </Link>
        </div>

        {/* Tour Cards Row (Flexbox only) */}
        {loading ? (
          <div className="w-full flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"></div>
              <p className="mt-4 text-white text-sm">Loading tours...</p>
            </div>
          </div>
        ) : error ? (
          <div className="w-full flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-red-400 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-white text-[#003A5A] rounded-lg hover:bg-gray-100"
              >
                Retry
              </button>
            </div>
          </div>
        ) : filteredTours.length === 0 ? (
          <div className="w-full flex items-center justify-center py-12">
            <p className="text-white text-sm">No tours available for this category.</p>
          </div>
        ) : (
          <motion.div
            key={activeTab}
            className="w-full flex flex-row items-stretch justify-start sm:justify-center gap-4 sm:gap-5 lg:gap-6 overflow-x-auto lg:overflow-visible pb-4 pt-1 px-1 scrollbar-none snap-x"
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {filteredTours.slice(0, 4).map((tour, index) => (
              <TourCard key={tour.id} tour={tour} index={index} />
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}
