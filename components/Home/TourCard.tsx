"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Trip } from "@/api/trips";
import { buildImageUrl } from "@/api/gallery";

interface TourCardProps {
  tour: Trip;
  index?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function TourCard({ tour }: TourCardProps) {
  const { t } = useLanguage();

  // Generate slug from trip name
  const slug = tour.name
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || String(tour.id);

  // Get primary image or first image
  const primaryImage = tour.images?.find(img => img.isPrimary);
  const imageUrl = primaryImage?.imageUrl || tour.images?.[0]?.imageUrl;
  const fullImageUrl = imageUrl ? buildImageUrl(imageUrl) : "/images/placeholder-tour.jpg";

  // Format price
  const priceDisplay = `${tour.currencyName || "$"} ${tour.adultPrice.toFixed(2)}`;

  return (
    <motion.div
      variants={cardVariants as Variants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="w-[235px] sm:w-[245px] lg:w-[255px] flex-shrink-0 snap-center"
    >
      <Link
        href={`/trips/${slug}`}
        className="bg-white rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-md hover:shadow-xl flex flex-col w-full h-full group transition-shadow duration-300 cursor-pointer"
      >
        {/* Tour Image */}
        <div className="relative h-36 sm:h-40 overflow-hidden bg-gray-200">
          <img
            src={fullImageUrl}
            alt={tour.name || "Tour"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Card Content */}
        <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-2.5">
          <div className="flex flex-col gap-0.5">
            {/* Trip Type */}
            {tour.tripTypeName && (
              <span className="font-roboto text-[11px] text-gray-500 font-normal">
                {tour.tripTypeName}
              </span>
            )}

            {/* Title */}
            <h3 className="font-roboto font-bold text-sm sm:text-[15px] text-[#16181E] leading-snug line-clamp-1 group-hover:text-[#006993] transition-colors">
              {tour.name}
            </h3>

            {/* Location */}
            {(tour.destination || tour.destinationInfo?.name) && (
              <div className="flex items-center gap-1 text-gray-500 text-[11px] mt-0.5">
                <svg
                  className="w-3 h-3 text-gray-400 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="font-roboto">
                  {tour.destinationInfo?.name || tour.destination}
                </span>
              </div>
            )}
          </div>

          {/* Price Row - No rating since Trip model doesn't have it */}
          <div className="flex items-center justify-between pt-0.5">
            {/* Empty space for layout consistency */}
            <div className="flex items-center gap-1">
              {/* No rating data available in Trip model */}
            </div>

            {/* Price */}
            <div className="font-roboto font-bold text-xs sm:text-sm text-[#39CA5B]">
              {priceDisplay}
            </div>
          </div>

          {/* Book Now Button */}
          <span
            className="w-full mt-0.5 bg-[#003A5A] group-hover:bg-[#00263E] text-white font-roboto font-semibold text-xs sm:text-sm py-2 rounded-full text-center shadow-sm group-hover:shadow-md transition-all duration-200 block"
          >
            {t("bestselling.bookNow", "Book Now")}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
