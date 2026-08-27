"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function CartPageHeader() {
  const { t } = useLanguage();

  return (
    <div className="mb-6 sm:mb-8">
      <h1 className="font-roboto font-bold text-slate-800 text-2xl sm:text-3xl tracking-tight">
        {t("cart.title", "Booking Cart")}
      </h1>
      <p className="font-roboto text-gray-500 text-sm sm:text-[15px] mt-1">
        {t("cart.subtitle", "Review your selected tours before payment")}
      </p>
    </div>
  );
}
