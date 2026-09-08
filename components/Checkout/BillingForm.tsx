"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import FormField from "./FormField";
import { getPromoCodeByCode } from "@/api/promoCode";
import type { PromoCode } from "@/modules/promoCode.model";

const nationalities = [
  "Select Nationality",
  "Egyptian",
  "American",
  "British",
  "German",
  "French",
  "Italian",
  "Spanish",
  "Australian",
  "Canadian",
  "Saudi",
  "Emirati",
  "Russian",
  "Chinese",
  "Japanese",
  "Indian",
  "Other",
];

const INPUT_CLS =
  "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-roboto text-slate-700 placeholder-gray-400 focus:outline-none focus:border-[#004560] focus:ring-1 focus:ring-[#004560]/20";

export interface BillingFormData {
  firstName: string;
  lastName: string;
  nationality: string;
  email: string;
  phone: string;
  hotelName: string;
  roomNumber: string;
  notes: string;
  couponCode: string;
  paymentMethod: string;
}

interface BillingFormProps {
  onSubmit: (data: BillingFormData) => void;
  onCouponApplied: (promoCode: PromoCode | null) => void;
  isSubmitting?: boolean;
  bookingError?: string | null;
}

export default function BillingForm({
  onSubmit,
  onCouponApplied,
  isSubmitting = false,
  bookingError,
}: BillingFormProps) {
  const { t } = useLanguage();

  const [formData, setFormData] = useState<BillingFormData>({
    firstName: "",
    lastName: "",
    nationality: "Select Nationality",
    email: "",
    phone: "",
    hotelName: "",
    roomNumber: "",
    notes: "",
    couponCode: "",
    paymentMethod: "book-now-pay-later",
  });

  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const set = (key: keyof BillingFormData) => (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleApplyCoupon = async (e: React.MouseEvent) => {
    e.preventDefault();

    const codeText = formData.couponCode.trim();

    if (!codeText) {
      setCouponApplied(false);
      setCouponError(
        t("checkout.invalidCoupon", "Please enter a valid coupon code")
      );
      onCouponApplied(null);
      return;
    }

    const code = Number(codeText);

    if (!Number.isFinite(code)) {
      setCouponApplied(false);
      setCouponError(
        t("checkout.invalidCoupon", "Please enter a valid coupon code")
      );
      onCouponApplied(null);
      return;
    }

    setCouponLoading(true);
    setCouponError("");
    setCouponApplied(false);

    try {
      const promoCode = await getPromoCodeByCode(code);

      console.log("Coupon code sent:", code);
      console.log("Promo response:", promoCode);
      
      if (!promoCode) {
        throw new Error("Invalid coupon");
      }

      if (promoCode.isActived === false) {
        throw new Error("Coupon is inactive");
      }

      const hasEuroDiscount =
        promoCode.discountEuro !== null &&
        promoCode.discountEuro > 0;

      const hasPercentDiscount =
        promoCode.discountpercent !== null &&
        promoCode.discountpercent > 0;

      if (hasEuroDiscount === hasPercentDiscount) {
        throw new Error("Invalid coupon discount configuration");
      }

      setCouponApplied(true);
      setCouponError("");
      onCouponApplied(promoCode);
    } catch (error) {
      console.error("Coupon error:", error);

      setCouponApplied(false);
      onCouponApplied(null);

      setCouponError(
        t(
          "checkout.invalidCoupon",
          "Invalid or unavailable coupon code"
        )
      );
    } finally {
      setCouponLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="lg:col-span-7 xl:col-span-8">
      {/* Booking API error banner */}
      {bookingError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-roboto">
          <strong className="font-bold">{t("checkout.bookingFailed", "Booking failed")}: </strong>
          {bookingError}
        </div>
      )}

      <h1 className="font-roboto font-bold text-slate-800 text-lg sm:text-xl mb-6">
        {t("checkout.billingDetails", "Billing Details")}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label={t("checkout.firstName", "First Name")}
            required
          >
            <input
              type="text"
              required
              placeholder={t("checkout.firstName", "First Name")}
              value={formData.firstName}
              onChange={set("firstName")}
              className={INPUT_CLS}
            />
          </FormField>

          <FormField
            label={t("checkout.lastName", "Last Name")}
            required
          >
            <input
              type="text"
              required
              placeholder={t("checkout.lastName", "Last Name")}
              value={formData.lastName}
              onChange={set("lastName")}
              className={INPUT_CLS}
            />
          </FormField>
        </div>

        {/* Row 2 */}
        <FormField
          label={t("checkout.nationality", "Nationality")}
          required
        >
          <div className="relative">
            <select
              value={formData.nationality}
              onChange={set("nationality")}
              className="w-full appearance-none px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-roboto text-slate-700 bg-white focus:outline-none focus:border-[#004560] focus:ring-1 focus:ring-[#004560]/20 cursor-pointer"
            >
              {nationalities.map((n) => (
                <option key={n} value={n}>
                  {n === "Select Nationality"
                    ? t(
                        "checkout.selectNationality",
                        "Select Nationality"
                      )
                    : t(`nationalities.${n.toLowerCase()}`, n)}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center px-4 text-gray-400">
              <svg
                className="w-4 h-4"
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
        </FormField>

        {/* Row 3 */}
        <FormField
          label={t("checkout.emailAddress", "Email address")}
          required
        >
          <input
            type="email"
            required
            placeholder={t("checkout.emailAddress", "Email Address")}
            value={formData.email}
            onChange={set("email")}
            className={INPUT_CLS}
          />
        </FormField>

        {/* Row 4 */}
        <FormField
          label={t("checkout.phoneNumber", "Phone Number")}
          required
        >
          <input
            type="tel"
            required
            placeholder={t("checkout.phoneNumber", "Phone Number")}
            value={formData.phone}
            onChange={set("phone")}
            className={INPUT_CLS}
          />
        </FormField>

        {/* Row 5 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label={t("checkout.hotelName", "Hotel Name")}
            required
          >
            <input
              type="text"
              required
              placeholder={t("checkout.hotelName", "Hotel Name")}
              value={formData.hotelName}
              onChange={set("hotelName")}
              className={INPUT_CLS}
            />
          </FormField>

          <FormField
            label={t("checkout.roomNumber", "Room Number")}
            required
          >
            <input
              type="text"
              placeholder={t("checkout.roomNumber", "Room Number")}
              value={formData.roomNumber}
              onChange={set("roomNumber")}
              className={INPUT_CLS}
            />
          </FormField>
        </div>

        {/* Row 6 */}
        <FormField label={t("checkout.notes", "Notes")}>
          <textarea
            rows={3}
            placeholder={t("checkout.addNotes", "Add Notes")}
            value={formData.notes}
            onChange={set("notes")}
            className={`${INPUT_CLS} resize-none`}
          />
        </FormField>

        {/* Row 7: Coupon */}
        <div className="pt-2">
          <label className="block text-xs font-bold text-slate-800 font-roboto mb-1.5">
            {t("checkout.coupon", "Coupon")}
          </label>

          <div className="flex rounded-xl overflow-hidden border border-gray-200 max-w-lg">
            <input
              type="text"
              inputMode="numeric"
              placeholder={t(
                "checkout.enterCoupon",
                "Enter coupon Number"
              )}
              value={formData.couponCode}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  couponCode: e.target.value,
                }));

                setCouponError("");
                setCouponApplied(false);
                onCouponApplied(null);
              }}
              className="flex-1 px-4 py-2.5 text-sm font-roboto text-slate-700 placeholder-gray-400 outline-none bg-white"
            />

            <button
              type="button"
              onClick={handleApplyCoupon}
              disabled={couponLoading}
              className="px-8 py-2.5 bg-[#004360] hover:bg-[#00344b] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-roboto font-semibold transition-colors cursor-pointer"
            >
              {couponLoading
                ? t("checkout.applying", "Applying...")
                : t("checkout.apply", "Apply")}
            </button>
          </div>

          {couponApplied && (
            <p className="text-xs text-emerald-600 font-roboto mt-1">
              {t(
                "checkout.couponApplied",
                "Coupon applied successfully!"
              )}
            </p>
          )}

          {couponError && (
            <p className="text-xs text-red-500 font-roboto mt-1">
              {couponError}
            </p>
          )}
        </div>

        {/* Row 8 */}
        <div className="pt-3">
          <h3 className="font-roboto font-bold text-slate-800 text-sm sm:text-base mb-3">
            {t("checkout.paymentMethod", "Payment Method")}
          </h3>

          <div className="space-y-3 font-roboto text-sm text-slate-700">
            {[
              {
                value: "book-now-pay-later",
                label: t(
                  "checkout.payLater",
                  "Book Now Pay later"
                ),
              },
              { value: "paypal", label: "Paypal" },
              { value: "visa", label: "Visa" },
            ].map(({ value, label }) => (
              <label
                key={value}
                className="flex items-center gap-3 cursor-pointer select-none"
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={value}
                  checked={formData.paymentMethod === value}
                  onChange={set("paymentMethod")}
                  className="w-4 h-4 text-[#004360] border-gray-300 focus:ring-[#004360]"
                />
                <span className="font-medium text-slate-800">
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full max-w-sm sm:max-w-md mx-auto block py-3 rounded-full border border-[#004360] text-[#004360] hover:bg-[#004360] hover:text-white font-roboto font-semibold text-sm sm:text-base transition-all duration-200 text-center shadow-xs cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? t("checkout.booking", "Booking...")
              : t("checkout.confirmBooking", "Confirm Booking")}
          </button>
        </div>
      </form>
    </div>
  );
}

