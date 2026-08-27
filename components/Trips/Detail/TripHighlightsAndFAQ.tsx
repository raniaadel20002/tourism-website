"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface TripHighlightsAndFAQProps {
  highlights: string[];
  faqs: { question: string; answer: string }[];
}

export default function TripHighlightsAndFAQ({
  highlights,
  faqs,
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

      {/* ── FAQs ─────────────────────────────────────────────────── */}
      <div className="w-full lg:w-1/2 border border-gray-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white shadow-xs">
        <div className="mb-5">
          <span className="bg-[#006993] text-white font-roboto font-semibold text-xs px-4 py-1.5 rounded-full inline-block">
            {t("trips.faqs", "FAQs")}
          </span>
        </div>
        <div className="flex flex-col divide-y divide-gray-100">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div key={idx} className="py-3 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="flex items-center justify-between w-full text-left gap-4 cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className="font-roboto font-semibold text-xs sm:text-sm text-[#000C09] group-hover:text-[#006993] transition-colors leading-snug">
                    {faq.question}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#F3F8FB] flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-[#006993]/10">
                    <svg
                      className={`w-3.5 h-3.5 text-[#006993] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {isOpen && (
                  <p className="mt-2 font-roboto text-xs sm:text-sm text-[#484848] leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </motion.div>
  );
}
