"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { CartItem, useCart } from "@/context/CartContext";

interface CartItemCardProps {
  item: CartItem;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function CartItemCard({ item }: CartItemCardProps) {
  const { removeItem } = useCart();
  const { t } = useLanguage();

  const getBadgeStyle = (category: string, type?: string) => {
    const norm = (type || category).toLowerCase();
    if (norm.includes("sea") || norm.includes("snorkel") || norm.includes("diving")) {
      return "bg-[#edf5ff] text-[#3b82f6]";
    }
    if (norm.includes("historic") || norm.includes("culture") || norm.includes("balloon")) {
      return "bg-[#f5efff] text-[#a855f7]";
    }
    if (norm.includes("safari") || norm.includes("desert")) {
      return "bg-[#fff8eb] text-[#f59e0b]";
    }
    return "bg-slate-100 text-slate-700";
  };

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5 transition-all duration-200 hover:shadow-sm"
    >
      {/* Tour Thumbnail */}
      <div className="w-full sm:w-48 md:w-52 h-44 sm:h-36 shrink-0 relative rounded-xl overflow-hidden bg-slate-100">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, 220px"
          className="object-cover"
        />
      </div>

      {/* Tour Details */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          {/* Top Row: Title and Remove Button */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-roboto font-bold text-slate-800 text-lg sm:text-[19px] leading-tight">
              {item.title}
            </h3>

            <button
              onClick={() => removeItem(item.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1 border border-red-200/90 rounded-lg text-red-500 hover:bg-red-50 hover:border-red-300 transition-colors text-xs font-medium shrink-0 cursor-pointer"
              aria-label={`Remove ${item.title} from cart`}
            >
              <svg
                className="w-3.5 h-3.5 stroke-red-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.75}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <span>{t("cart.remove", "Remove")}</span>
            </button>
          </div>

          {/* Category Tag Badge */}
          <div className="mt-1">
            <span
              className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-medium ${getBadgeStyle(
                item.category,
                item.categoryType
              )}`}
            >
              {item.category}
            </span>
          </div>

          {/* Meta Information (Location, Date, Guests) */}
          <div className="flex items-center flex-wrap gap-x-5 gap-y-1.5 text-xs text-gray-500 mt-2.5 font-roboto">
            <div className="flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{item.location}</span>
            </div>

            <div className="flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{item.date}</span>
            </div>

            <div className="flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>{item.adults} {t("booking.adults", "Adults")}</span>
            </div>
          </div>
        </div>

        {/* Pricing block */}
        <div className="mt-3 sm:mt-2">
          <p className="text-xs text-gray-500 font-normal font-roboto">
            ${item.pricePerPerson} {t("cart.perPerson", "per person")}
          </p>
          <p className="text-xl sm:text-2xl font-bold text-slate-800 font-roboto mt-0.5">
            ${item.totalPrice}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
