"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

export default function BookingModal() {
  const router = useRouter();

  const {
    isBookingModalOpen,
    closeBookingModal,
    activeBooking,
    updateActiveBooking,
    addItem,
  } = useCart();

  const { t } = useLanguage();

  /**
   * Maps JS getDay() (0=Sun,1=Mon,...6=Sat) to the backend day names.
   * Backend uses: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
   */
  const JS_DAY_NAMES: Record<number, string> = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  /**
   * Returns true if the given YYYY-MM-DD date string falls on an available weekday.
   * If availableDays is empty, no date is allowed (explicit — do not silently allow all).
   */
  const isDateAllowed = (dateStr: string): boolean => {
    if (
      !activeBooking.availableDays ||
      activeBooking.availableDays.length === 0
    ) {
      return false;
    }

    const d = new Date(dateStr + "T00:00:00");
    const jsDay = d.getDay();
    const dayName = JS_DAY_NAMES[jsDay];

    return activeBooking.availableDays.includes(dayName);
  };

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    if (!value) {
      updateActiveBooking({ tourDate: "" });
      return;
    }

    if (!isDateAllowed(value)) {
      const available = activeBooking.availableDays;

      const dayMsg =
        available.length > 0
          ? `${t("booking.onlyAvailableOn", "This trip is only available on:")} ${available.join(", ")}.`
          : t("booking.noDaysConfigured", "This trip has no available days configured. Please contact support.");

      alert(dayMsg);
      updateActiveBooking({ tourDate: "" });
      return;
    }

    updateActiveBooking({ tourDate: value });
  };

  const handleAdultChange = (delta: number) => {
    const newCount = Math.max(
      1,
      activeBooking.adultCount + delta
    );

    updateActiveBooking({ adultCount: newCount });
  };

  const handleChildChange = (delta: number) => {
    const newCount = Math.max(
      0,
      activeBooking.childCount + delta
    );

    updateActiveBooking({ childCount: newCount });
  };

  const toggleExtra = (extraId: string) => {
    const current = [...activeBooking.selectedExtras];
    const index = current.indexOf(extraId);

    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(extraId);
    }

    updateActiveBooking({ selectedExtras: current });
  };

  const handleProceedToCheckout = () => {
    if (!activeBooking.tourDate) {
      alert(t("booking.selectDateAlert", "Please select a tour date."));
      return;
    }

    if (!activeBooking.tripId) {
      alert(t("booking.invalidTrip", "Invalid trip."));
      return;
    }

    /**
     * Add the selected booking to the frontend cart.
     * The cart is stored locally because there is no Cart/Basket API.
     */
    addItem({
      id: `${activeBooking.tripId}-${activeBooking.tourDate}`,
      title: activeBooking.tripTitle,
      summaryTitle: activeBooking.tripTitle,
      category: "",
      location: "",
      date: activeBooking.tourDate,
      summaryDate: activeBooking.tourDate,
      adults: activeBooking.adultCount,
      pricePerPerson: activeBooking.adultPrice,
      totalPrice: activeBooking.totalAmount,
      image: activeBooking.tripImage,
    });

    closeBookingModal();

    router.push("/cart");
  };

  return (
    <AnimatePresence>
      {isBookingModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={closeBookingModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[28px] max-w-4xl w-full p-6 sm:p-8 relative shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={closeBookingModal}
              className="absolute top-5 right-5 rtl:right-auto rtl:left-5 text-slate-800 hover:text-black p-2 cursor-pointer rounded-full hover:bg-slate-100 transition-colors z-10"
              aria-label={t("booking.closeModal", "Close modal")}
            >
              <svg
                className="w-6 h-6 stroke-slate-800"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal 2-Column Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start pt-2">
              {/* Left Column: Date, Steppers, Extras */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Date Selection */}
                <div>
                  <h3 className="font-roboto font-bold text-slate-800 text-base mb-2">
                    {t(
                      "booking.selectDate",
                      "Please select a tour date"
                    )}
                  </h3>

                  <div className="relative">
                    <div className="w-full px-4 py-3 rounded-xl border border-gray-200 flex items-center justify-between text-sm text-slate-700 bg-white shadow-xs focus-within:border-[#004560] focus-within:ring-1 focus-within:ring-[#004560]/20">
                      <div className="flex items-center gap-2.5 flex-1">
                        <svg
                          className="w-5 h-5 text-gray-400 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>

                        <input
                          type="date"
                          value={activeBooking.tourDate || ""}
                          onChange={handleDateChange}
                          min={
                            new Date()
                              .toISOString()
                              .split("T")[0]
                          }
                          className="w-full outline-none bg-transparent font-roboto text-slate-700 text-sm"
                        />
                      </div>

                      <svg
                        className="w-4 h-4 text-gray-400 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Available days hint */}
                {activeBooking.availableDays &&
                activeBooking.availableDays.length > 0 ? (
                  <p className="text-xs text-gray-500 font-roboto mt-1.5">
                    {t("booking.availableOn", "Available on:")}{" "}
                    <span className="font-medium text-slate-700">
                      {activeBooking.availableDays.join(", ")}
                    </span>
                  </p>
                ) : (
                  <p className="text-xs text-amber-600 font-roboto mt-1.5">
                    {t("booking.noAvailableDays", "No available days are configured for this trip.")}
                  </p>
                )}

                {/* 2. Quantity Section */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-roboto font-bold text-slate-800 text-base">
                      {t("booking.quantity", "Quantity")}
                    </h3>

                    <span className="text-emerald-600 text-xs font-semibold flex items-center gap-1 font-roboto">
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
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      ( {t("booking.minOne", "Min: 1")} )
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 font-roboto mb-3">
                    {t(
                      "booking.selectUpTo50",
                      "You can select up to 50 for this package"
                    )}
                  </p>

                  {/* Adult Stepper Card */}
                  <div className="bg-[#f4f9fd] rounded-2xl px-5 py-3.5 flex items-center justify-between text-sm font-roboto mb-3">
                    <span className="font-medium text-slate-800 text-sm sm:text-base">
                      {t("booking.adults", "Adult")}
                    </span>

                    <span className="text-xs text-slate-500 font-medium">
                      $
                      {activeBooking.adultPrice > 0
                        ? `${activeBooking.adultPrice}.00`
                        : "0.00"}
                    </span>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleAdultChange(1)}
                        className="w-8 h-8 rounded-full bg-[#003853] text-white flex items-center justify-center hover:bg-[#00283d] transition-colors cursor-pointer shadow-xs"
                        aria-label={t("booking.increaseAdults", "Increase adults")}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>

                      <span className="font-bold text-slate-800 text-base min-w-[20px] text-center">
                        {activeBooking.adultCount}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleAdultChange(-1)}
                        className="w-8 h-8 rounded-full bg-[#003853] text-white flex items-center justify-center hover:bg-[#00283d] transition-colors cursor-pointer shadow-xs"
                        aria-label={t("booking.decreaseAdults", "Decrease adults")}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Children Stepper Card */}
                  <div className="bg-[#f4f9fd] rounded-2xl px-5 py-3.5 flex items-center justify-between text-sm font-roboto">
                    <span className="font-medium text-slate-800 text-sm sm:text-base">
                      {t(
                        "booking.childrenAge",
                        "Children 3-11 years"
                      )}
                    </span>

                    <span className="text-xs text-slate-500 font-medium">
                      $
                      {activeBooking.childPrice > 0
                        ? `${activeBooking.childPrice}.00`
                        : "0.00"}
                    </span>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleChildChange(1)}
                        className="w-8 h-8 rounded-full bg-[#003853] text-white flex items-center justify-center hover:bg-[#00283d] transition-colors cursor-pointer shadow-xs"
                        aria-label={t("booking.increaseChildren", "Increase children")}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>

                      <span className="font-bold text-slate-800 text-base min-w-[20px] text-center">
                        {activeBooking.childCount}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleChildChange(-1)}
                        className="w-8 h-8 rounded-full bg-[#003853] text-white flex items-center justify-center hover:bg-[#00283d] transition-colors cursor-pointer shadow-xs"
                        aria-label={t("booking.decreaseChildren", "Decrease children")}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Extra Services Section */}
                <div>
                  <h3 className="font-roboto font-bold text-slate-800 text-base mb-1">
                    {t(
                      "booking.extraServices",
                      "Extra Services"
                    )}
                  </h3>

                  <p className="text-xs text-gray-500 font-roboto mb-3">
                    {t(
                      "booking.addExtras",
                      "Add extra services on your reservation"
                    )}
                  </p>

                  <div className="space-y-2.5">
                    <label
                      onClick={() =>
                        toggleExtra("health-insurance-30")
                      }
                      className="flex items-center gap-3 cursor-pointer select-none font-roboto text-sm text-slate-700"
                    >
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          activeBooking.selectedExtras.includes(
                            "health-insurance-30"
                          )
                            ? "border-[#004560] bg-[#004560] text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {activeBooking.selectedExtras.includes(
                          "health-insurance-30"
                        ) && (
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>

                      <span>
                        {t(
                          "booking.healthInsurance",
                          "Health Insurance"
                        )}{" "}
                        ( $ 30 )
                      </span>
                    </label>

                    <label
                      onClick={() =>
                        toggleExtra("medical-insurance-50")
                      }
                      className="flex items-center gap-3 cursor-pointer select-none font-roboto text-sm text-slate-700"
                    >
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          activeBooking.selectedExtras.includes(
                            "medical-insurance-50"
                          )
                            ? "border-[#004560] bg-[#004560] text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {activeBooking.selectedExtras.includes(
                          "medical-insurance-50"
                        ) && (
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>

                      <span>
                        {t(
                          "booking.medicalInsurance",
                          "Medical Insurance"
                        )}{" "}
                        ( $ 50 )
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Booking Summary Card */}
              <div className="lg:col-span-5">
                <div className="bg-[#f4f9fd] rounded-[24px] p-5 sm:p-6 border border-blue-50/60">
                  <h2 className="font-roboto font-bold text-slate-800 text-lg mb-4">
                    {t(
                      "cart.bookingSummary",
                      "Booking summary"
                    )}
                  </h2>

                  {/* Mini Tour Card */}
                  <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-gray-100 shadow-xs flex items-center gap-3 relative mb-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 relative bg-slate-100">
                      <Image
                        src={activeBooking.tripImage}
                        alt={activeBooking.tripTitle}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 pr-4 rtl:pr-0 rtl:pl-4">
                      <p className="font-roboto font-semibold text-slate-800 text-xs sm:text-[13px] truncate">
                        {activeBooking.tripTitle}
                      </p>

                      <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-roboto mt-1">
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

                        <span>
                          {activeBooking.tourDate || "—"}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={closeBookingModal}
                      className="absolute top-2.5 right-2.5 rtl:right-auto rtl:left-2.5 text-slate-400 hover:text-red-500 transition-colors p-1"
                      aria-label={t("cart.remove", "Remove")}
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
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

                  {/* Package Breakdown */}
                  <div className="space-y-3 font-roboto text-xs">
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2">
                        {t("cart.package", "Package")}
                      </h4>

                      <div className="space-y-1 text-slate-600">
                        <div className="flex justify-between">
                          <span>
                            {t("booking.adults", "Adult")}:{" "}
                            {activeBooking.adultCount} x$
                            {activeBooking.adultPrice}
                          </span>

                          <span className="font-semibold text-slate-800">
                            $
                            {activeBooking.adultCount *
                              activeBooking.adultPrice}
                          </span>
                        </div>

                        {activeBooking.childCount > 0 && (
                          <div className="flex justify-between">
                            <span>
                              {t("booking.child", "Child")}:{" "}
                              {activeBooking.childCount} x$
                              {activeBooking.childPrice}
                            </span>

                            <span className="font-semibold text-slate-800">
                              $
                              {activeBooking.childCount *
                                activeBooking.childPrice}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Extra Services Breakdown */}
                    {activeBooking.selectedExtras.length > 0 && (
                      <div className="pt-2">
                        <h4 className="font-semibold text-slate-700 mb-2">
                          {t(
                            "cart.extraServices",
                            "Extra Services"
                          )}
                        </h4>

                        <div className="space-y-1 text-slate-600">
                          {activeBooking.selectedExtras.includes(
                            "health-insurance-30"
                          ) && (
                            <div className="flex justify-between">
                              <span>
                                {t(
                                  "booking.healthInsurance",
                                  "Health Insurance"
                                )}
                              </span>

                              <span className="font-semibold text-slate-800">
                                $30
                              </span>
                            </div>
                          )}

                          {activeBooking.selectedExtras.includes(
                            "medical-insurance-50"
                          ) && (
                            <div className="flex justify-between">
                              <span>
                                {t(
                                  "booking.medicalInsurance",
                                  "Medical Insurance"
                                )}
                              </span>

                              <span className="font-semibold text-slate-800">
                                $50
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Divider Line */}
                    <div className="border-t border-slate-300/80 my-4" />

                    {/* Total */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-bold text-slate-800 text-sm">
                        {t("cart.total", "Total")}
                      </span>

                      <span className="font-bold text-[#22c55e] text-xl">
                        ${activeBooking.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Centered Button */}
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="inline-flex items-center justify-center gap-2 px-12 py-3 rounded-full border border-[#0f4c5c] text-[#0f4c5c] font-roboto font-medium text-sm sm:text-base hover:bg-[#0f4c5c] hover:text-white transition-all duration-200 shadow-xs group cursor-pointer"
              >
                <span>
                  {t(
                    "booking.proceedToCheckout",
                    "Proceed to check out"
                  )}
                </span>

                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

