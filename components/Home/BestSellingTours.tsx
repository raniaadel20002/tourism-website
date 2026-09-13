"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import TourCard from "@/components/Home/TourCard";
import { getTrips, getTripsByType, Trip } from "@/services/trips";
import { getTripTypes, TripType } from "@/services/tripType";

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
  const [activeTab, setActiveTab] = useState<number | "all">("all");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [tripTypes, setTripTypes] = useState<TripType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { t, language } = useLanguage();
  const apiLang = language;

  // Load all trips and trip types
  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);

        const typesPromise = getTripTypes(undefined, {
          pageNumber: 1,
          pageSize: 100,
          lang: apiLang,
        });

        const tripsPromise =
          activeTab === "all"
            ? getTrips(undefined, 1, 100, {
              lang: apiLang,
            })
            : getTripsByType(
              activeTab,
              undefined,
              1,
              100,
              apiLang
            );

        const [tripsData, typesData] = await Promise.all([
          tripsPromise,
          typesPromise,
        ]);

        if (cancelled) return;

        setTrips(tripsData.filter((trip: Trip) => trip.isActive));
        setTripTypes(typesData);
        setError(null);
      } catch (err) {
        if (cancelled) return;

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load tours"
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [apiLang, activeTab]);



  // Load trips for the selected trip type from the API
  const handleFilterChange = async (typeId: number | "all") => {
    if (typeId === activeTab) return;

    // Change the selected filter immediately.
    // Keep the current cards visible while the new API data is loading.
    setActiveTab(typeId);
    setError(null);

    try {
      const data =
        typeId === "all"
          ? await getTrips(undefined, 1, 100, {
            lang: apiLang,
          })
          : await getTripsByType(
            typeId,
            undefined,
            1,
            100,
            apiLang
          );

      // Replace the cards only after the new API response is ready.
      setTrips(data.filter((trip: Trip) => trip.isActive));
    } catch (err) {
      // Keep the current cards if the new filter request fails.
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load tours"
      );

      console.error(
        typeId === "all"
          ? "Failed to fetch all tours:"
          : `Failed to fetch tours for type ${typeId}:`,
        err
      );
    }
  };

  return (
    <section className="relative bg-[#13445d] py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decorative Shape */}
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
          <span className="font-montez text-[#69DD84] text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight mb-1 tracking-wide">
            {t("bestselling.subtitle", "Explore Tours")}
          </span>

          <h2 className="font-roboto text-[#FDFEFF] text-2xl sm:text-3xl lg:text-[36px] font-semibold tracking-tight mb-2.5">
            {t("bestselling.title", "Best-Selling Tours")}
          </h2>

          <div className="w-16 sm:w-20 h-1 sm:h-1.5 bg-[#69DD84] rounded-full" />
        </motion.div>

        {/* Filter Controls + View More */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Dynamic Trip Type Filters */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-2.5">
            {/* All Tours */}
            <button
              type="button"
              onClick={() => handleFilterChange("all")}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-roboto font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer ${activeTab === "all"
                  ? "bg-[#69DD84] text-white shadow-md scale-100 font-semibold"
                  : "bg-white text-[#4A5568] hover:bg-gray-100 hover:scale-105 shadow-sm"
                }`}
            >
              {t("bestselling.allTours", "All Tours")}
            </button>

            {/* Trip Types from API */}
            {tripTypes.map((type) => {
              const isActive = activeTab === type.id;

              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleFilterChange(type.id)}
                  className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-roboto font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer ${isActive
                      ? "bg-[#69DD84] text-white shadow-md scale-100 font-semibold"
                      : "bg-white text-[#4A5568] hover:bg-gray-100 hover:scale-105 shadow-sm"
                    }`}
                >
                  {type.name}
                </button>
              );
            })}
          </div>

          {/* View More */}
          <Link
            href="/trips"
            className="flex-shrink-0 border border-[#FDFEFF] text-[#FDFEFF] hover:bg-white hover:text-[#003A5A] font-roboto font-medium text-xs sm:text-sm px-5 sm:px-6 py-1.5 sm:py-2 rounded-full transition-all duration-300"
          >
            {t("bestselling.moreTours", "View More")}
          </Link>
        </div>

        {/* Loading */}
        {loading && trips.length === 0 ? (
          <div className="w-full flex flex-row items-stretch justify-start sm:justify-center gap-4 sm:gap-5 lg:gap-6 overflow-x-auto lg:overflow-visible pb-4 pt-1 px-1 scrollbar-none snap-x">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={`tour-skel-${idx}`}
                className="w-[235px] sm:w-[245px] lg:w-[255px] flex-shrink-0 snap-center bg-white rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-md flex flex-col animate-pulse"
              >
                <div className="h-36 sm:h-40 bg-gray-200 w-full" />

                <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-3">
                  <div className="flex flex-col gap-2">
                    <div className="h-2.5 w-16 bg-gray-200 rounded" />
                    <div className="h-4 w-36 bg-gray-200 rounded" />
                    <div className="h-3 w-24 bg-gray-200 rounded" />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="h-3 w-16 bg-gray-200 rounded" />
                    <div className="h-4 w-14 bg-gray-200 rounded" />
                  </div>

                  <div className="w-full h-8 bg-gray-200 rounded-full mt-0.5" />
                </div>
              </div>
            ))}
          </div>
        ) : error && trips.length === 0 ? (
          <div className="w-full flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-red-400 mb-4">{error}</p>

              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-white text-[#003A5A] rounded-lg hover:bg-gray-100"
              >
                {t("bestselling.retry", "Retry")}
              </button>
            </div>
          </div>
        ) : trips.length === 0 ? (
          <div className="w-full flex items-center justify-center py-12">
            <p className="text-white text-sm">
              {t(
                "bestselling.noTours",
                "No tours available for this category."
              )}
            </p>
          </div>
        ) : (
          <motion.div
            className="w-full flex flex-row items-stretch justify-start sm:justify-center gap-4 sm:gap-5 lg:gap-6 overflow-x-auto lg:overflow-visible pb-4 pt-1 px-1 scrollbar-none snap-x"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {trips.slice(0, 4).map((tour, index) => (
              <TourCard
                key={tour.id}
                tour={tour}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
