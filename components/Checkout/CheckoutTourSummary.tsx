"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ActiveBooking } from "@/context/CartContext";

interface CheckoutTourSummaryProps {
  booking: ActiveBooking;
}

export default function CheckoutTourSummary({ booking }: CheckoutTourSummaryProps) {
  const { t } = useLanguage();
  const totalTravellers = booking.adultCount + booking.childCount;

  return (
    <div className="lg:col-span-5 xl:col-span-4">
      <div className="bg-[#f4f9fd] rounded-[24px] p-6 border border-blue-50/80 sticky top-24">
        <h2 className="font-roboto font-bold text-slate-800 text-base sm:text-lg mb-3">
          {t("checkout.tourDetails", "Tour Details")}
        </h2>

        {/* Tour Title */}
        <p className="font-roboto font-medium text-[#004360] text-xs sm:text-sm leading-snug">
          {booking.tripTitle}
        </p>

        {/* Date */}
        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-roboto mt-2">
          <svg
            className="w-3.5 h-3.5 text-slate-400"
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
          <span>{booking.tourDate}</span>
        </div>

        {/* No. of Travellers */}
        <div className="flex items-center justify-between text-xs font-roboto text-slate-700 mt-3 pt-2">
          <span>{t("checkout.noOfTravellers", "No. of Travellers")}:</span>
          <span className="font-semibold text-slate-800">{totalTravellers}</span>
        </div>

        {/* Package Breakdown */}
        <div className="mt-4 pt-1">
          <h3 className="font-roboto font-bold text-slate-800 text-xs mb-2">{t("cart.package", "Package")}</h3>
          <p className="text-xs text-slate-600 font-roboto mb-1">{t("checkout.travellers", "Traveller(s)")}:</p>

          <div className="space-y-1.5 font-roboto text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>{t("booking.adults", "Adult")}: {booking.adultCount} x ${booking.adultPrice}</span>
              <span className="font-semibold text-slate-800">
                ${booking.adultCount * booking.adultPrice}
              </span>
            </div>

            {booking.childCount > 0 && (
              <div className="flex items-center justify-between text-slate-600">
                <span>{t("booking.child", "Child")}: {booking.childCount} x ${booking.childPrice}</span>
                <span className="font-semibold text-slate-800">
                  ${booking.childCount * booking.childPrice}
                </span>
              </div>
            )}

            {booking.extraServicesTotal > 0 && (
              <div className="flex items-center justify-between text-slate-600 pt-1">
                <span>{t("cart.extraServices", "Extra Services")}:</span>
                <span className="font-semibold text-slate-800">
                  ${booking.extraServicesTotal}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-slate-600 pt-2">
              <span>{t("checkout.subtotal", "Subtotal")}:</span>
              <span className="font-semibold text-slate-800">${booking.totalAmount}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-300/80 my-3.5" />

          {/* Total */}
          <div className="flex items-center justify-between font-roboto">
            <span className="font-bold text-slate-800 text-sm">{t("cart.total", "Total")}:</span>
            <span className="font-bold text-[#22c55e] text-xl">${booking.totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
