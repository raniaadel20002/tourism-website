
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import BillingForm, {
  BillingFormData,
} from "@/components/Checkout/BillingForm";
import CheckoutTourSummary from "@/components/Checkout/CheckoutTourSummary";
import type { PromoCode } from "@/modules/promoCode.model";

export default function CheckoutPage() {
  const router = useRouter();

  const { activeBooking, completeBooking } = useCart();

  const [appliedPromoCode, setAppliedPromoCode] =
    useState<PromoCode | null>(null);

  const [bookingError, setBookingError] = useState<string | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: BillingFormData) => {
    setBookingError(null);
    setIsSubmitting(true);

    try {
      await completeBooking(data);
      router.push("/confirmation");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Booking failed. Please try again.";
      setBookingError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const subtotal = activeBooking.totalAmount;

  let discountAmount = 0;

  if (appliedPromoCode) {
    if (
      appliedPromoCode.discountpercent !== null &&
      appliedPromoCode.discountpercent > 0
    ) {
      discountAmount =
        subtotal *
        (appliedPromoCode.discountpercent / 100);
    } else if (
      appliedPromoCode.discountEuro !== null &&
      appliedPromoCode.discountEuro > 0
    ) {
      discountAmount = appliedPromoCode.discountEuro;
    }
  }

  discountAmount = Math.min(
    Math.max(discountAmount, 0),
    subtotal
  );

  const finalTotal = Math.max(
    subtotal - discountAmount,
    0
  );

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
        >
          <BillingForm
            onSubmit={handleSubmit}
            onCouponApplied={setAppliedPromoCode}
            isSubmitting={isSubmitting}
            bookingError={bookingError}
          />

          <CheckoutTourSummary
            booking={activeBooking}
            discountAmount={discountAmount}
            finalTotal={finalTotal}
          />
        </motion.div>
      </div>
    </div>
  );
}
