"use client";

import { useState } from "react";
import Image from "next/image";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  date: string;
  quote: string;
  avatar: string;
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
  const current = testimonials[activeIdx] || testimonials[0];

  const handlePrev = () =>
    setActiveIdx((p) => (p === 0 ? testimonials.length - 1 : p - 1));
  const handleNext = () =>
    setActiveIdx((p) => (p === testimonials.length - 1 ? 0 : p + 1));

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 sm:gap-8 w-full">

      {/* Overall Rating Summary Box */}
      <div className="w-full lg:w-[48%] border border-gray-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white shadow-xs flex items-center justify-between gap-6">

        {/* Big Score */}
        <div className="flex flex-col items-center justify-center flex-shrink-0">
          <div className="flex items-center gap-1 text-3xl sm:text-4xl font-roboto font-bold text-[#000C09]">
            <span>{rating}</span>
            <span className="text-[#F59E0B] text-2xl sm:text-3xl">★</span>
          </div>
          <span className="mt-2 bg-[#004560] text-white font-roboto text-xs px-4 py-1 rounded-full font-medium">
            {reviewsSummaryCount} reviews
          </span>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="flex-1 flex flex-col gap-1.5 font-roboto text-xs text-gray-500">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-2">
              <span className="w-4 text-right font-medium">{star} ★</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F59E0B] rounded-full"
                  style={{ width: `${ratingBreakdown[star] ?? 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Prev Arrow */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous testimonial"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#39CA5B] hover:bg-[#2EA84B] text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-sm cursor-pointer flex-shrink-0"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Testimonial Quote Card */}
      <div className="w-full lg:w-[52%] border border-gray-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white shadow-xs flex items-center justify-between gap-5 sm:gap-6">
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="text-[#000C09] text-3xl font-serif leading-none block mb-1">"</span>
            <div className="mb-2">
              <h4 className="font-roboto font-bold text-sm sm:text-base text-[#000C09]">{current.name}</h4>
              <span className="font-roboto text-xs text-gray-400">{current.location} · {current.date}</span>
            </div>
            <p className="font-roboto text-xs sm:text-sm text-[#484848] leading-relaxed italic">
              &quot;{current.quote}&quot;
            </p>
          </div>
        </div>

        {/* Avatar */}
        <div className="relative w-16 sm:w-20 h-16 sm:h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-100 shadow-sm">
          <Image src={current.avatar} alt={current.name} fill className="object-cover object-center" />
        </div>

        {/* Next Arrow */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next testimonial"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#39CA5B] hover:bg-[#2EA84B] text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-sm cursor-pointer flex-shrink-0"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

    </div>
  );
}
