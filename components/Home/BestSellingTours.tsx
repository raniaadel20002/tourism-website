"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import TourCard, { BestSellingTour } from "@/components/Home/TourCard";

const filterTabs = [
  "All Tours",
  "Snorkelling",
  "Diving",
  "Safari",
  "Over day",
];

export const bestSellingToursData: BestSellingTour[] = [
  {
    id: "island-trip",
    title: "Island Trip",
    tripType: "Sea Trip",
    location: "Hurghada",
    rating: 4.8,
    reviewsCount: 345,
    price: "$ 30.6 USA",
    image: "/images/home/bestselling/IslandTrip.jpg",
    slug: "island-trip",
    categoryTag: "Snorkelling",
  },
  {
    id: "luxor-day-tour",
    title: "Luxor Day Tour",
    tripType: "Historical Trip",
    location: "Luxor",
    rating: 4.8,
    reviewsCount: 345,
    price: "$ 30.6 USA",
    image: "/images/home/bestselling/LuxorDayTour.jpg",
    slug: "luxor-day-tour",
    categoryTag: "Over day",
  },
  {
    id: "desert-safari",
    title: "Desert Safari Quad Adventure",
    tripType: "Safari Trip",
    location: "Hurghada",
    rating: 4.8,
    reviewsCount: 345,
    price: "$ 30.6 USA",
    image: "/images/home/bestselling/DesertSafariQuadAdventure.jpg",
    slug: "desert-safari-quad",
    categoryTag: "Safari",
  },
  {
    id: "snorkeling-orange-bay",
    title: "Snorkeling Trip to Orange Bay",
    tripType: "Sea Trip",
    location: "Hurghada",
    rating: 4.8,
    reviewsCount: 345,
    price: "$ 30.6 USA",
    image: "/images/home/bestselling/SnorkelingTriptoOrangeBay.jpg",
    slug: "snorkeling-orange-bay",
    categoryTag: "Snorkelling",
  },
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

  const filteredTours =
    activeTab === "All Tours"
      ? bestSellingToursData
      : bestSellingToursData.filter((t) => {
          if (activeTab === "Snorkelling") return t.categoryTag === "Snorkelling" || t.tripType.includes("Sea");
          if (activeTab === "Diving") return t.categoryTag === "Diving" || t.tripType.includes("Sea");
          if (activeTab === "Safari") return t.categoryTag === "Safari" || t.tripType.includes("Safari");
          if (activeTab === "Over day") return t.categoryTag === "Over day" || t.tripType.includes("Historical");
          return true;
        });

  return (
    <section className="relative bg-[#13445d] py-10 lg:py-2 px-4 sm:px-6 lg:px-8 overflow-x-clip">
      {/* Background Decorative Shape from heart.svg */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1358px]  z-0"
        aria-hidden="true"
      >
        <Image
          src="/images/home/bestselling/heart.svg"
          alt=""
          width={1358}
          height={1133}
          className="w-full h-auto object-top"
          priority
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div
          className="flex flex-col items-center text-center mb-10 sm:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants as Variants}
        >
          {/* Small Title */}
          <span className="font-montez text-[#69DD84] text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight mb-1 tracking-wide">
            Explore Tours
          </span>

          {/* Main Title */}
          <h2 className="font-roboto text-[#FDFEFF] text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight mb-3">
            Best-Selling Tours
          </h2>

          {/* Decorative Underline */}
          <div className="w-16 sm:w-20 h-1 sm:h-1.5 bg-[#69DD84] rounded-full" />
        </motion.div>

        {/* Filter Controls + View More Bar */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 sm:mb-12">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-3">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full font-roboto font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
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
            className="flex-shrink-0 border border-[#FDFEFF] text-[#FDFEFF] hover:bg-white hover:text-[#003A5A] font-roboto font-medium text-xs sm:text-sm px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300"
          >
            View More
          </Link>
        </div>

        {/* Tour Cards Row (Flexbox only) */}
        <motion.div
          key={activeTab}
          className="w-full flex flex-row items-stretch justify-start sm:justify-center gap-5 lg:gap-6 overflow-x-auto lg:overflow-visible pb-6 pt-2 px-2 scrollbar-none snap-x"
          initial="hidden"
          animate="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {filteredTours.map((tour, index) => (
            <TourCard key={tour.id} tour={tour} index={index} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
