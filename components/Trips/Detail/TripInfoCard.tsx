"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface TripInfoCardProps {
  location: string;
  duration: string;
  transportation: string;
  availability: string;
  language: string;
  groupSize: string;
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
  Transportation: (
    <svg className="w-4 h-4 text-[#006993]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  Availability: (
    <svg className="w-4 h-4 text-[#006993]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Language: (
    <svg className="w-4 h-4 text-[#006993]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
    </svg>
  ),
  Group: (
    <svg className="w-4 h-4 text-[#006993]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
};

export default function TripInfoCard({ location, duration, transportation, availability, language, groupSize }: TripInfoCardProps) {
  const { t } = useLanguage();

  const items = [
    { key: "Location", label: t("contact.locationLabel", "Location"), value: location },
    { key: "Duration", label: t("trips.duration", "Duration"), value: duration },
    { key: "Transportation", label: t("trips.transportation", "Transportation"), value: transportation },
    { key: "Availability", label: t("trips.availability", "Availability"), value: availability },
    { key: "Language", label: t("trips.language", "Language"), value: language },
    { key: "Group", label: t("trips.groupSize", "Group"), value: groupSize },
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
