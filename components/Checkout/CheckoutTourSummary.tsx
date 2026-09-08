"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ActiveBooking } from "@/context/CartContext";

interface CheckoutTourSummaryProps {
  booking: ActiveBooking;
  discountAmount?: number;
  finalTotal?: number;
}

export default function CheckoutTourSummary({
  booking,
  discountAmount = 0,
  finalTotal = booking.totalAmount,
}: CheckoutTourSummaryProps) {
  const { t } = useLanguage();

  const totalTravellers =
    booking.adultCount + booking.childCount;

  return (
    <div className="lg:col-span-5 xl:col-span-4">
      <div className="bg-[#f4f9fd] rounded-[24px] p-6 border border-blue-50/80 sticky top-24">
        <h2 className="font-roboto font-bold text-slate-800 text-lg mb-4">
          {t("checkout.tourDetails", "Tour Details")}
        </h2>

        <p className="font-roboto font-semibold text-slate-800 text-sm">
          {booking.tripTitle}
        </p>

        <div className="text-xs text-gray-500 mt-2">
          {booking.tourDate}
        </div>

        <div className="text-xs text-gray-500 mt-1">
          {t("checkout.travellers", "Traveller(s)")}:{" "}
          {totalTravellers}
        </div>

        <div className="mt-5">
          <h3 className="font-roboto font-semibold text-slate-700 text-sm mb-3">
            {t("cart.package", "Package")}
          </h3>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>
                {t("booking.adults", "Adult")}:{" "}
                {booking.adultCount} x ${booking.adultPrice}
              </span>

              <span className="font-semibold text-slate-800">
                ${booking.adultCount * booking.adultPrice}
              </span>
            </div>

            {booking.childCount > 0 && (
              <div className="flex justify-between">
                <span>
                  {t("booking.child", "Child")}:{" "}
                  {booking.childCount} x ${booking.childPrice}
                </span>

                <span className="font-semibold text-slate-800">
                  ${booking.childCount * booking.childPrice}
                </span>
              </div>
            )}

            {booking.extraServicesTotal > 0 && (
              <div className="flex justify-between">
                <span>
                  {t("cart.extraServices", "Extra Services")}
                </span>

                <span className="font-semibold text-slate-800">
                  ${booking.extraServicesTotal}
                </span>
              </div>
            )}
          </div>

          <div className="border-t border-slate-300/80 my-4" />

          <div className="flex justify-between text-xs text-slate-600">
            <span>{t("cart.subtotal", "Subtotal")}</span>
            <span className="font-semibold text-slate-800">
              ${booking.totalAmount}
            </span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between text-xs text-emerald-600 mt-2">
              <span>{t("checkout.discount", "Discount")}</span>
              <span className="font-semibold">
                -${discountAmount.toFixed(2)}
              </span>
            </div>
          )}

          <div className="border-t border-slate-300/80 my-4" />

          <div className="flex items-center justify-between pt-1">
            <span className="font-bold text-slate-800 text-sm">
              {t("cart.total", "Total")}
            </span>

            <span className="font-bold text-[#22c55e] text-xl">
              ${finalTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

