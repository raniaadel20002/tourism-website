"use client";

import { useLanguage } from "@/context/LanguageContext";

interface TripIncludedExcludedProps {
  included: string[];
  excluded: string[];
}

export default function TripIncludedExcluded({ included, excluded }: TripIncludedExcludedProps) {
  const { t } = useLanguage();

  return (
    <div className="mt-8">
      <h2 className="font-roboto font-bold text-lg sm:text-xl text-[#000C09] mb-4">
        {t("trips.includedExcluded", "Included / Excluded")}
      </h2>
      <div className="flex flex-col sm:flex-row items-start gap-8 sm:gap-12 w-full">
        {/* Included */}
        <div className="flex-1 flex flex-col">
          <div className="mb-3.5">
            <span className="bg-[#EBF9EE] text-[#39CA5B] font-roboto font-semibold text-xs px-4 py-1 rounded-full inline-block">
              {t("trips.included", "Included")}
            </span>
          </div>
          <ul className="flex flex-col gap-2.5 font-roboto text-xs sm:text-sm text-[#484848]">
            {included.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-[#39CA5B] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Excluded */}
        <div className="flex-1 flex flex-col">
          <div className="mb-3.5">
            <span className="bg-[#FEECEB] text-[#E53E3E] font-roboto font-semibold text-xs px-4 py-1 rounded-full inline-block">
              {t("trips.excluded", "Excluded")}
            </span>
          </div>
          <ul className="flex flex-col gap-2.5 font-roboto text-xs sm:text-sm text-[#484848]">
            {excluded.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-[#E53E3E] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
