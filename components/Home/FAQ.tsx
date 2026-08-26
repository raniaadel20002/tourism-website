"use client";

import { useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "1",
    question: "How do I book a tour?",
    answer:
      "Choose your experience, select your date, complete your booking, and receive instant confirmation.",
  },
  {
    id: "2",
    question: "Are your activities family-friendly?",
    answer:
      "Yes! Many of our tours are designed to be enjoyed by all ages with child-friendly guides and activities.",
  },
  {
    id: "3",
    question: "What's included in my booking?",
    answer:
      "Most bookings include professional English-speaking guides, transportation from your hotel, entrance fees to listed attractions, and bottled water.",
  },
  {
    id: "4",
    question: "Can I cancel or reschedule?",
    answer:
      "Yes! We offer flexible booking policies with full refunds up to 48 hours in advance.",
  },
];

export default function FAQ() {
  const [openIds, setOpenIds] = useState<string[]>(["1"]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="bg-white py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        {/* ── Section Header ────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          {/* Small Title */}
          <span className="font-montez text-[#69DD84] text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight mb-1 tracking-wide">
            Your Perfect Journey, Crafted with Care
          </span>

          {/* Main Title */}
          <h2 className="font-roboto text-[#006993] text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight mb-3">
            Frequently Asked Questions
          </h2>

          {/* Decorative Underline */}
          <div className="w-16 sm:w-20 h-1 sm:h-1.5 bg-[#69DD84] rounded-full" />
        </div>

        {/* ── FAQ Items List ───────────────────────────────────── */}
        <div className="w-full flex flex-col gap-3.5 sm:gap-4">
          {faqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                className="bg-[#F4F8FA] rounded-xl sm:rounded-2xl overflow-hidden transition-colors duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  className="w-full flex items-center justify-between gap-4 px-6 sm:px-8 py-5 sm:py-6 text-left cursor-pointer transition-opacity duration-150 hover:opacity-90"
                  aria-expanded={isOpen}
                  id={`faq-btn-${faq.id}`}
                  aria-controls={`faq-panel-${faq.id}`}
                >
                  <span className="font-roboto font-medium text-[#004560] text-base sm:text-lg md:text-[19px] leading-snug">
                    {faq.question}
                  </span>

                  {/* Chevron arrow icon */}
                  <span className="flex-shrink-0 text-[#004560] transition-transform duration-300">
                    <svg
                      className={`w-4 sm:w-5 h-4 sm:h-5 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
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
                  </span>
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div
                    id={`faq-panel-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${faq.id}`}
                    className="px-6 sm:px-8 pb-5 sm:pb-6 pt-0 animate-fadeIn"
                  >
                    <p className="font-roboto font-normal text-[#535764] text-sm sm:text-base md:text-[16.5px] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
