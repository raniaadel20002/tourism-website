"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface TripInfoCardProps {
  location: string;
  duration: string;
  availability: string;
}

const ICONS: Record<string, React.ReactNode> = {
  Location: (
    <svg className="w-4 h-4 text-[#006993]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Duration: (
    <svg className="w-4 h-4 text-[#006993]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Availability: (
    <svg className="w-4 h-4 text-[#006993]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
};

export default function TripInfoCard({ location, duration, availability }: TripInfoCardProps) {
  const { t } = useLanguage();

  const items = [
    { key: "Location", label: t("trips.location", "Location"), value: location },
    { key: "Duration", label: t("trips.duration", "Duration"), value: duration },
    { key: "Availability", label: t("trips.availability", "Availability"), value: availability },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full border border-gray-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 bg-white shadow-xs"
    >
      <div className="mb-6">
        <span className="bg-[#006993] text-white font-roboto font-semibold text-xs px-4 py-1.5 rounded-full inline-block">
          {t("trips.tripInfo", "Trip Info")}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 font-roboto text-xs sm:text-sm">
        {items.map(({ key, label, value }) => (
          <div key={key} className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#F3F8FB] flex items-center justify-center flex-shrink-0">
              {ICONS[key]}
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">{label}</span>
              <span className="font-semibold text-[#000C09]">{value}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
