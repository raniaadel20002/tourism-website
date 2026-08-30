"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface FAQItem {
  id: string;
  qKey: string;
  defaultQ: string;
  aKey: string;
  defaultA: string;
}

const faqs: FAQItem[] = [
  {
    id: "1",
    qKey: "faq.q1",
    defaultQ: "How do I book a tour?",
    aKey: "faq.a1",
    defaultA:
      "Choose your experience, select your date, complete your booking, and receive instant confirmation.",
  },
  {
    id: "2",
    qKey: "faq.q2",
    defaultQ: "Are your activities family-friendly?",
    aKey: "faq.a2",
    defaultA:
      "Yes! Many of our tours are designed to be enjoyed by all ages with child-friendly guides and activities.",
  },
  {
    id: "3",
    qKey: "faq.q3",
    defaultQ: "What's included in my booking?",
    aKey: "faq.a3",
    defaultA:
      "Most bookings include professional English-speaking guides, transportation from your hotel, entrance fees to listed attractions, and bottled water.",
  },
  {
    id: "4",
    qKey: "faq.q4",
    defaultQ: "Can I cancel or reschedule?",
    aKey: "faq.a4",
    defaultA:
      "Yes! We offer flexible booking policies with full refunds up to 48 hours in advance.",
  },
];

/* ─── Framer Motion Variants ─── */
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function FAQ() {
  const [openIds, setOpenIds] = useState<string[]>(["1"]);
  const { t } = useLanguage();

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center">

        {/* ── Section Header ── */}
        <motion.div
          className="flex flex-col items-center text-center mb-6 sm:mb-8"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Small Title */}
          <span className="font-montez text-[#69DD84] text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight mb-1 tracking-wide">
            {t("faq.subtitle", "Your Perfect Journey, Crafted with Care")}
          </span>

          {/* Main Title */}
          <h2 className="font-roboto text-[#006993] text-2xl sm:text-3xl lg:text-[36px] font-semibold tracking-tight mb-2.5">
            {t("faq.title", "Frequently Asked Questions")}
          </h2>

          {/* Decorative Underline */}
          <div className="w-16 sm:w-20 h-1 sm:h-1.5 bg-[#69DD84] rounded-full" />
        </motion.div>

        {/* ── FAQ Items List ── */}
        <motion.div
          className="w-full flex flex-col gap-2.5 sm:gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {faqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <motion.div
                key={faq.id}
                variants={cardVariants}
                className="bg-[#F4F8FA] rounded-xl sm:rounded-2xl overflow-hidden transition-colors duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-3.5 sm:py-4 text-left cursor-pointer transition-opacity duration-150 hover:opacity-90"
                  aria-expanded={isOpen}
                  id={`faq-btn-${faq.id}`}
                  aria-controls={`faq-panel-${faq.id}`}
                >
                  <span className="font-roboto font-medium text-[#004560] text-sm sm:text-base md:text-[17px] leading-snug">
                    {t(faq.qKey, faq.defaultQ)}
                  </span>

                  {/* Chevron — animated rotation via Framer Motion */}
                  <motion.span
                    className="flex-shrink-0 text-[#004560]"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
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

                {/* Answer Content — smooth height + opacity reveal */}
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
                      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-4 sm:pb-5 pt-0">
                        <p className="font-roboto font-normal text-[#535764] text-xs sm:text-sm md:text-[15px] leading-relaxed">
                          {t(faq.aKey, faq.defaultA)}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

