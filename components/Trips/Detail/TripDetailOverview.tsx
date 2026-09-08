"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import TripIncludedExcluded from "./TripIncludedExcluded";

interface TripDetailOverviewProps {
  title: string;
  description: string;
  location: string;
  rating: number;
  reviewCount: number;
  duration: string;
  tourType: string;
  included: string[];
  excluded: string[];
}

export default function TripDetailOverview({
  title, description, location, rating, reviewCount,
  duration, tourType, included, excluded,
}: TripDetailOverviewProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full lg:w-[62%] flex flex-col"
    >
      <h1 className="font-roboto font-bold text-2xl sm:text-3xl lg:text-[34px] text-[#000C09] leading-tight mb-3">
        {title}
      </h1>
      <p className="font-roboto font-normal text-sm sm:text-base text-[#484848] leading-relaxed mb-4">
        {description}
      </p>

      {/* Location & Rating */}
      <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 font-roboto mb-5">
        <div className="flex items-center gap-1.5 text-[#006993]">
          <svg className="w-4 h-4 text-[#006993] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-gray-600 font-medium">{location}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#F59E0B]">
          <svg className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-gray-600 font-medium">{rating} {t("tours.reviews", "Reviews")} ({reviewCount})</span>
        </div>
      </div>

      {/* Quick Highlights Pill */}
      <div className="bg-[#F3F8FB] rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border border-blue-50/60 text-xs sm:text-sm font-roboto">
        <div className="flex items-center gap-2 text-[#004560]">
          <svg className="w-4 h-4 text-[#006993]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-gray-700">{t("trips.duration", "Duration")}: <strong className="font-semibold text-[#000C09]">{duration}</strong></span>
        </div>
        <div className="flex items-center gap-2 text-[#004560]">
          <svg className="w-4 h-4 text-[#006993]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
          <span className="text-gray-700">{t("trips.tourType", "Tour Type")}: <strong className="font-semibold text-[#000C09]">{tourType}</strong></span>
        </div>
      </div>

      {/* Included / Excluded */}
      <TripIncludedExcluded included={included} excluded={excluded} />
    </motion.div>
  );
}
