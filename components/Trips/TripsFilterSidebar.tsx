"use client";

import { useLanguage } from "@/context/LanguageContext";
import { tripTypeOptions } from "@/data/trips";

interface TripsFilterSidebarProps {
  selectedDestination: string;
  onDestinationChange: (v: string) => void;
  minPrice: string;
  onMinPriceChange: (v: string) => void;
  maxPrice: string;
  onMaxPriceChange: (v: string) => void;
  selectedType: string;
  onTypeChange: (v: string) => void;
  onClearAll: () => void;
  isOpen: boolean;
}

export default function TripsFilterSidebar({
  selectedDestination,
  onDestinationChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  selectedType,
  onTypeChange,
  onClearAll,
  isOpen,
}: TripsFilterSidebarProps) {
  const { t } = useLanguage();

  return (
    <aside
      className={`w-full lg:w-[280px] flex-shrink-0 bg-[#F4F8FA] rounded-2xl p-6 ${
        isOpen ? "block" : "hidden lg:block"
      }`}
    >
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-5 border-b border-gray-200/80 mb-6">
        <h2 className="font-roboto font-medium text-[#030811] text-base sm:text-lg">
          {t("trips.filter", "Filter")}
        </h2>
        <button
          type="button"
          onClick={onClearAll}
          className="font-roboto text-xs text-[#006993] hover:text-[#004560] font-normal transition-colors cursor-pointer"
        >
          {t("trips.clearAll", "Clear all filter")}
        </button>
      </div>

      {/* Destination Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2.5">
          <svg className="w-4 h-4 text-[#004560]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <label htmlFor="destination-select" className="font-roboto font-normal text-[#030811] text-sm">
            {t("trips.destinationLabel", "Destination")}
          </label>
        </div>
        <div className="relative">
          <select
            id="destination-select"
            value={selectedDestination}
            onChange={(e) => onDestinationChange(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 font-roboto text-xs sm:text-sm text-[#030811] focus:outline-none focus:border-[#004560] cursor-pointer"
          >
            <option value="All">{t("trips.allDestinations", "All Destinations")}</option>
            <option value="Hurghada">{t("destinations.hurghada", "Hurghada")}</option>
            <option value="Luxor">{t("destinations.luxor", "Luxor")}</option>
            <option value="Giza">{t("destinations.giza", "Giza")}</option>
            <option value="Cairo">{t("destinations.cairo", "Cairo")}</option>
            <option value="Aswan">{t("destinations.aswan", "Aswan")}</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center px-3 text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2.5">
          <svg className="w-4 h-4 text-[#004560]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span className="font-roboto font-normal text-[#030811] text-sm">{t("trips.priceRange", "Price Range")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2">
            <span className="font-roboto text-xs text-gray-400 mr-1 rtl:mr-0 rtl:ml-1">$</span>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => onMinPriceChange(e.target.value)}
              className="w-full font-roboto text-xs sm:text-sm text-[#030811] focus:outline-none"
              placeholder="20"
            />
          </div>
          <span className="font-roboto text-xs text-[#5B6472] px-1">{t("trips.to", "To")}</span>
          <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2">
            <span className="font-roboto text-xs text-gray-400 mr-1 rtl:mr-0 rtl:ml-1">$</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(e.target.value)}
              className="w-full font-roboto text-xs sm:text-sm text-[#030811] focus:outline-none"
              placeholder="100"
            />
          </div>
        </div>
      </div>

      {/* Trips Types Checkboxes */}
      <div>
        <h3 className="font-roboto font-medium text-[#030811] text-sm mb-3">{t("trips.tripsTypes", "Trips Types")}</h3>
        <div className="flex flex-col gap-2.5">
          {tripTypeOptions.map((item) => {
            const isChecked = selectedType === item.label;
            return (
              <label
                key={item.label}
                className="flex items-center justify-between cursor-pointer group py-0.5"
                onClick={() => onTypeChange(item.label)}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                      isChecked
                        ? "bg-[#004560] text-white"
                        : "border border-gray-300 bg-white group-hover:border-gray-400"
                    }`}
                  >
                    {isChecked && (
                      <svg className="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="font-roboto text-xs sm:text-sm text-[#030811] group-hover:text-[#004560] transition-colors">
                    {item.label}
                  </span>
                </div>
                <span className="font-roboto text-xs text-gray-400">{item.count}</span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
