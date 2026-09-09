"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getFAQs } from "@/api/faq";

interface FAQItem {
  id: number;
  text: string;
  answer: string;
}

export default function FAQ() {
  const [openIds, setOpenIds] = useState<string[]>(["1"]);
  const { t, language } = useLanguage();

  const [faqs, setFAQs] = useState<FAQItem[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchFAQs() {
      try {
        const data = await getFAQs(undefined, 1, 100, language);

        if (!cancelled) {
          setFAQs(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        if (!cancelled) {
          setInitialLoading(false);
        }
      }
    }

    fetchFAQs();

    return () => {
      cancelled = true;
    };
  }, [language]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
          <span className="font-montez text-[#69DD84] text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight mb-1 tracking-wide">
            {t(
              "faq.subtitle",
              "Your Perfect Journey, Crafted with Care"
            )}
          </span>

          <h2 className="font-roboto text-[#006993] text-2xl sm:text-3xl lg:text-[36px] font-semibold tracking-tight mb-2.5">
            {t("faq.title", "Frequently Asked Questions")}
          </h2>

          <div className="w-16 sm:w-20 h-1 sm:h-1.5 bg-[#69DD84] rounded-full" />
        </div>

        {/* FAQ Items List */}
        <div className="w-full flex flex-col gap-2.5 sm:gap-3">
          {initialLoading && faqs.length === 0 ? (
            <>
              {/* First skeleton matches the initial open item */}
              <div className="bg-[#F4F8FA] rounded-xl sm:rounded-2xl overflow-hidden animate-pulse">
                <div className="w-full h-[58px] sm:h-[64px] px-5 sm:px-6 flex items-center justify-between">
                  <div className="h-4 w-2/3 bg-gray-200/70 rounded" />
                  <div className="w-4 h-4 bg-gray-200/70 rounded-full" />
                </div>
                <div className="px-5 sm:px-6 pb-4 sm:pb-5 pt-0 space-y-2">
                  <div className="h-3.5 w-full bg-gray-200/60 rounded" />
                  <div className="h-3.5 w-4/5 bg-gray-200/60 rounded" />
                </div>
              </div>
              {/* Remaining 4 skeletons match closed items */}
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`faq-skeleton-${index}`}
                  className="w-full h-[58px] sm:h-[64px] bg-[#F4F8FA] rounded-xl sm:rounded-2xl animate-pulse px-5 sm:px-6 flex items-center justify-between"
                >
                  <div className="h-4 w-1/2 bg-gray-200/70 rounded" />
                  <div className="w-4 h-4 bg-gray-200/70 rounded-full" />
                </div>
              ))}
            </>
          ) : (
            faqs.map((faq) => {
              const isOpen = openIds.includes(faq.id.toString());

              return (
                <div
                  key={faq.id}
                  className="bg-[#F4F8FA] rounded-xl sm:rounded-2xl overflow-hidden transition-colors duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id.toString())}
                    className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-3.5 sm:py-4 text-left cursor-pointer transition-opacity duration-150 hover:opacity-90"
                    aria-expanded={isOpen}
                    id={`faq-btn-${faq.id}`}
                    aria-controls={`faq-panel-${faq.id}`}
                  >
                    <span className="font-roboto font-medium text-[#004560] text-sm sm:text-base md:text-[17px] leading-snug">
                      {t(faq.text)}
                    </span>

                    <motion.span
                      className="flex-shrink-0 text-[#004560]"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{
                        duration: 0.28,
                        ease: "easeInOut",
                      }}
                    >
                      <svg
                        className="w-4 sm:w-5 h-4 sm:h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${faq.id}`}
                        role="region"
                        aria-labelledby={`faq-btn-${faq.id}`}
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.28,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-4 sm:pb-5 pt-0">
                          <p className="font-roboto font-normal text-[#535764] text-xs sm:text-sm md:text-[15px] leading-relaxed">
                            {t(faq.answer)}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}

          {!initialLoading && faqs.length === 0 && (
            <p className="w-full text-center text-sm text-gray-500 py-6">
              {t("faq.noFAQs", "No FAQs are available yet.")}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}