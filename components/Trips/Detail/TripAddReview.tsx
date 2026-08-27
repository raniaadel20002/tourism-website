"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface TripAddReviewProps {
  onSubmit?: (rating: number, comment: string) => void;
}

export default function TripAddReview({ onSubmit }: TripAddReviewProps) {
  const [ratingScore, setRatingScore] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    onSubmit?.(ratingScore, reviewComment);
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setReviewComment("");
    }, 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full pt-4"
    >
      <h3 className="font-roboto font-bold text-lg sm:text-xl text-[#000C09] mb-1">
        {t("trips.addReview", "Add Review")}
      </h3>
      <p className="font-roboto text-xs text-gray-400 mb-4">
        {t("trips.reviewDisclaimer", "Your email address will not be published. Required fields are marked")} <span className="text-red-500">*</span>
      </p>

      {reviewSubmitted && (
        <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-roboto text-xs sm:text-sm flex items-center gap-2">
          <svg className="w-4 h-4 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{t("trips.reviewSubmitted", "Thank you! Your review has been submitted successfully.")}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Star Rating Selector */}
        <div className="flex flex-col items-start rtl:items-start gap-1">
          <span className="font-roboto text-xs font-medium text-gray-700">
            {t("trips.rating", "Rating")}
          </span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((starVal) => (
              <button
                key={starVal}
                type="button"
                onClick={() => setRatingScore(starVal)}
                className="text-lg sm:text-xl transition-colors cursor-pointer"
                style={{ color: starVal <= ratingScore ? "#F59E0B" : "#D1D5DB" }}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Comment Box */}
        <div className="flex flex-col items-start rtl:items-start">
          <label htmlFor="review-comment-input" className="font-roboto font-medium text-[#000C09] text-xs sm:text-sm mb-1.5">
            {t("blogs.commentMessage", "Comment")}
          </label>
          <textarea
            id="review-comment-input"
            rows={4}
            required
            placeholder={t("blogs.commentMessage", "Write your comment...")}
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            className="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl font-roboto text-xs sm:text-sm text-[#000C09] placeholder-gray-400 focus:outline-none focus:border-[#004560] transition-colors resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 sm:px-10 py-2.5 sm:py-3 rounded-full border border-[#004560] text-[#004560] hover:bg-[#004560] hover:text-white font-roboto font-semibold text-xs sm:text-sm transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer"
          >
            {t("trips.submitReview", "Submit Review")}
          </button>
        </div>

      </form>
    </motion.div>
  );
}
