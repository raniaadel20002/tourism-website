"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export interface BestSellingTour {
  id: string;
  title: string;
  tripType: string;
  location: string;
  rating: number;
  reviewsCount: number;
  price: string;
  image: string;
  slug: string;
  categoryTag: string;
}

interface TourCardProps {
  tour: BestSellingTour;
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

  return (
    <motion.div
      variants={cardVariants as Variants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="w-[235px] sm:w-[245px] lg:w-[255px] flex-shrink-0 snap-center"
    >
      <Link
        href={`/trips/${tour.slug}`}
        className="bg-white rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-md hover:shadow-xl flex flex-col w-full h-full group transition-shadow duration-300 cursor-pointer"
      >
        {/* Tour Image */}
        <div className="relative h-36 sm:h-40 overflow-hidden">
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Card Content */}
        <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-2.5">
          <div className="flex flex-col gap-0.5">
            {/* Trip Type */}
            <span className="font-roboto text-[11px] text-gray-500 font-normal">
              {tour.tripType}
            </span>

            {/* Title */}
            <h3 className="font-roboto font-bold text-sm sm:text-[15px] text-[#16181E] leading-snug line-clamp-1 group-hover:text-[#006993] transition-colors">
              {tour.title}
            </h3>

            {/* Location */}
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
              <span className="font-roboto">{tour.location}</span>
            </div>
          </div>

          {/* Rating & Price Row */}
          <div className="flex items-center justify-between pt-0.5">
            {/* Star & Reviews */}
            <div className="flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-roboto text-[11px] text-[#16181E] font-medium">
                {tour.rating} ({tour.reviewsCount})
              </span>
            </div>

            {/* Price */}
            <div className="font-roboto font-bold text-xs sm:text-sm text-[#39CA5B]">
              {tour.price}
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
