"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface TripBookingCardProps {
  duration: string;
  adultPrice: number;
  childPrice: number;
  onCheckAvailability: () => void;
}

export default function TripBookingCard({ duration, adultPrice, childPrice, onCheckAvailability }: TripBookingCardProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      className="w-full lg:w-[35%] lg:sticky lg:top-24 flex flex-col"
    >
      <div className="bg-[#F3F8FB] rounded-3xl p-6 sm:p-8 shadow-xs border border-blue-50/80 flex flex-col">

        {/* Duration */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-roboto text-gray-600 mb-4">
          <svg className="w-4 h-4 text-[#006993]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs">{t("trips.duration", "Duration")}</span>
            <span className="font-semibold text-[#000C09]">{duration}</span>
          </div>
        </div>

        <div className="border-b border-gray-200/80 my-3" />

        {/* Adult Price */}
        <div className="flex items-center justify-between py-2 text-xs sm:text-sm font-roboto">
          <div className="flex items-center gap-2 text-gray-700">
            <svg className="w-4 h-4 text-[#006993]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-medium text-[#000C09]">{t("booking.adults", "Adult")}</span>
          </div>
          <div className="text-right rtl:text-left">
            <span className="text-gray-400 text-[11px] block">{t("trips.from", "From")}</span>
            <span className="text-[#39CA5B] font-bold text-sm sm:text-base">${adultPrice} / {t("trips.person", "Person")}</span>
          </div>
        </div>

        {/* Child Price */}
        <div className="flex items-center justify-between py-2 text-xs sm:text-sm font-roboto mt-1">
          <div className="flex items-center gap-2 text-gray-700">
            <svg className="w-4 h-4 text-[#006993]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="font-medium text-[#000C09]">{t("booking.childrenAge", "Children 3-11 Years")}</span>
          </div>
          <div className="text-right rtl:text-left">
            <span className="text-gray-400 text-[11px] block">{t("trips.from", "From")}</span>
            <span className="text-[#39CA5B] font-bold text-sm sm:text-base">${childPrice} / {t("trips.person", "Person")}</span>
          </div>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={onCheckAvailability}
          className="w-full mt-6 py-3.5 bg-[#004560] hover:bg-[#003449] text-white font-roboto font-semibold text-xs sm:text-sm rounded-full text-center shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
        >
          {t("trips.checkAvailability", "Check Availability")}
        </button>

      </div>
    </motion.div>
  );
}
