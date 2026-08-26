"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function BookingSummary() {
  const { cartItems, removeItem, cartTotalAmount } = useCart();

  const packageTotal = cartItems.reduce(
    (sum, item) => sum + item.adults * item.pricePerPerson,
    0
  );

  return (
    <div className="bg-[#f4f9fd] rounded-[24px] p-5 sm:p-6 border border-blue-50/60 sticky top-24">
      {/* Title */}
      <h2 className="font-roboto font-bold text-slate-800 text-lg mb-4">
        Booking summary
      </h2>

      {/* Selected Items Mini Cards List */}
      <div className="space-y-2.5">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl p-2.5 sm:p-3 border border-gray-100/90 shadow-xs flex items-center gap-3 relative transition-all group"
          >
            {/* Mini Thumbnail */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 relative bg-slate-100">
              <Image
                src={item.image}
                alt={item.summaryTitle || item.title}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 pr-5">
              <p className="font-roboto font-semibold text-slate-800 text-xs sm:text-[13px] truncate">
                {item.summaryTitle || item.title}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-roboto mt-1">
                <svg
                  className="w-3.5 h-3.5 text-gray-400 shrink-0"
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
                <span>{item.summaryDate || item.date}</span>
              </div>
            </div>

            {/* Remove X Button */}
            <button
              onClick={() => removeItem(item.id)}
              className="absolute top-2.5 right-2.5 text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer rounded-full hover:bg-red-50"
              aria-label={`Remove ${item.title}`}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}

        {cartItems.length === 0 && (
          <div className="py-6 text-center text-xs text-gray-400 font-roboto bg-white/60 rounded-xl border border-dashed border-gray-200">
            No tours in summary
          </div>
        )}
      </div>

      {/* Pricing Breakdown */}
      {cartItems.length > 0 && (
        <div className="mt-4 pt-1">
          {/* Package Section */}
          <div>
            <h4 className="font-roboto font-semibold text-slate-700 text-xs mb-2">
              Package
            </h4>
            <div className="space-y-1.5 font-roboto text-xs">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-slate-600"
                >
                  <span>
                    Adult: {item.adults} x${item.pricePerPerson}
                  </span>
                  <span className="font-semibold text-slate-800">
                    ${item.adults * item.pricePerPerson}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Extra Services Section */}
          <div className="mt-3">
            <h4 className="font-roboto font-semibold text-slate-700 text-xs mb-2">
              Extra Services
            </h4>
            <div className="space-y-1.5 font-roboto text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Medical insurance</span>
                <span className="font-semibold text-slate-800">$20</span>
              </div>
            </div>
          </div>

          {/* Divider Line */}
          <div className="border-t border-slate-300/80 my-4" />

          {/* Total */}
          <div className="flex items-center justify-between font-roboto">
            <span className="font-bold text-slate-800 text-sm">Total</span>
            <span className="font-bold text-[#22c55e] text-xl">
              ${cartTotalAmount}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
