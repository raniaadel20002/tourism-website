"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface TripHighlightsAndFAQProps {
  highlights: string[];
}

export default function TripHighlightsAndFAQ({
  highlights
}: TripHighlightsAndFAQProps) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const { t } = useLanguage();

  const toggleFaq = (idx: number) =>
    setOpenFaqIdx((prev) => (prev === idx ? null : idx));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 w-full"
    >

      {/* ── Trip Highlights ──────────────────────────────────────── */}
      <div className="w-full lg:w-1/2 border border-gray-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white shadow-xs">
        <div className="mb-5">
          <span className="bg-[#006993] text-white font-roboto font-semibold text-xs px-4 py-1.5 rounded-full inline-block">
            {t("trips.highlights", "Trip Highlights")}
          </span>
        </div>
        <ul className="flex flex-col gap-3 font-roboto text-xs sm:text-sm text-[#484848]">
          {highlights.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#EBF9EE] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-[#39CA5B]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

    </motion.div>
  );
}
