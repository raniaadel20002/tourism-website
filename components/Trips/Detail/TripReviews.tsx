"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  date: string;
  quote: string;
  avatar?: string;
}

interface RatingBreakdown {
  [star: number]: number;
}

interface TripReviewsProps {
  rating: number;
  reviewsSummaryCount: number;
  ratingBreakdown: RatingBreakdown;
  testimonials: Testimonial[];
}

export default function TripReviews({
  rating,
  reviewsSummaryCount,
  ratingBreakdown,
  testimonials,
}: TripReviewsProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const { t } = useLanguage();

  const hasTestimonials = testimonials.length > 0;

  const current = hasTestimonials
    ? testimonials[activeIdx] || testimonials[0]
    : null;

  const handlePrev = () => {
    if (!hasTestimonials) return;

    setActiveIdx((p) =>
      p === 0 ? testimonials.length - 1 : p - 1
    );
  };

  const handleNext = () => {
    if (!hasTestimonials) return;

    setActiveIdx((p) =>
      p === testimonials.length - 1 ? 0 : p + 1
    );
  };

  const initials = current?.name
    ? current.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase()
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col lg:flex-row items-stretch gap-6 sm:gap-8 w-full"
    >
      {/* ================= Rating Summary ================= */}
      <div className="relative w-full lg:w-[48%]">

        <div className="w-full h-full border border-gray-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white shadow-xs flex items-center gap-6">
          <div className="flex flex-col items-center justify-center flex-shrink-0">
            <div className="flex items-center gap-1 text-3xl sm:text-4xl font-roboto font-bold text-[#000C09]">
              <span>{rating}</span>
              <span className="text-[#F59E0B] text-2xl sm:text-3xl">
                ★
              </span>
            </div>

            <span className="mt-2 bg-[#004560] text-white font-roboto text-xs px-4 py-1 rounded-full font-medium">
              {reviewsSummaryCount}{" "}
              {t("trips.reviews", "reviews")}
            </span>
          </div>

          <div className="flex-1 flex flex-col gap-1.5 font-roboto text-xs text-gray-500">
            {[5, 4, 3, 2, 1].map((star) => (
              <div
                key={star}
                className="flex items-center gap-2"
              >
                <span className="w-4 text-right font-medium">
                  {star} ★
                </span>

                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#F59E0B] rounded-full"
                    style={{
                      width: `${ratingBreakdown[star] ?? 0}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= Testimonial ================= */}
      <div className="relative w-full lg:w-[52%]">
        <div className="w-full h-full border border-gray-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white shadow-xs flex items-center justify-between gap-5 sm:gap-6">
          {/* Left Arrow - Outside the box */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={!hasTestimonials}
            aria-label={t("trips.previousReview", "Previous review")}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#004560] hover:bg-[#004560] hover:text-white hover:border-[#004560] transition-all duration-200"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          {current ? (
            <>
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <span className="text-[#004560] text-4xl sm:text-5xl font-serif leading-none">
                    "
                  </span>

                  <div className="mb-2">
                    <h4 className="font-roboto font-bold text-[#000C09] text-base sm:text-lg">
                      {current.name}
                    </h4>

                    <span className="font-roboto text-xs sm:text-sm text-gray-400">
                      {current.location}
                      {current.location && current.date ? " · " : ""}
                      {current.date}
                    </span>
                  </div>

                  <p className="font-roboto text-sm sm:text-base leading-relaxed text-gray-600">
                    &quot;{current.quote}&quot;
                  </p>
                </div>
              </div>

              <div className="relative w-16 sm:w-20 h-16 sm:h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-100 shadow-sm flex items-center justify-center bg-[#004560] text-white font-roboto font-bold text-lg sm:text-xl">
                {current.avatar ? (
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-center text-center py-6">
              <p className="font-roboto text-sm sm:text-base text-gray-500">
                {t(
                  "trips.noReviews",
                  "No reviews yet. Be the first to review this trip!"
                )}
              </p>
            </div>
          )}
        </div>

        {/* Right Arrow - Outside the box */}
        <button
          type="button"
          onClick={handleNext}
          disabled={!hasTestimonials}
          aria-label={t("trips.nextReview", "Next review")}
          className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#004560] hover:bg-[#004560] hover:text-white hover:border-[#004560] transition-all duration-200"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}