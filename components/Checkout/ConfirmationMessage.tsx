"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface ConfirmationMessageProps {
  bookingId: string;
}

export default function ConfirmationMessage({ bookingId }: ConfirmationMessageProps) {
  const { t } = useLanguage();

  return (
    <div className="text-center w-full mt-2 sm:mt-4">
      <h1 className="font-roboto font-bold text-[#003853] text-2xl sm:text-3xl md:text-4xl tracking-tight">
        {t("confirmation.title", "Trip Successfully Booked")}
      </h1>
      <p className="font-roboto text-gray-500 text-xs sm:text-sm mt-2 max-w-md mx-auto">
        {t("confirmation.reference", "Booking Reference")}:{" "}
        <span className="font-semibold text-slate-700">{bookingId}</span>.{" "}
        {t("confirmation.emailSent", "A confirmation email with tour details and pick-up time has been sent.")}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        <Link
          href="/"
          className="px-8 py-2.5 rounded-full bg-[#004360] hover:bg-[#00344b] text-white font-roboto font-semibold text-xs sm:text-sm transition-all shadow-xs"
        >
          {t("confirmation.backHome", "Back to Home")}
        </Link>
        <Link
          href="/trips"
          className="px-8 py-2.5 rounded-full border border-gray-300 text-slate-700 hover:bg-slate-50 font-roboto font-medium text-xs sm:text-sm transition-all"
        >
          {t("confirmation.exploreMore", "Explore More Trips")}
        </Link>
      </div>
    </div>
  );
}
