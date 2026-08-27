"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import BillingForm, { BillingFormData } from "@/components/Checkout/BillingForm";
import CheckoutTourSummary from "@/components/Checkout/CheckoutTourSummary";

export default function CheckoutPage() {
  const router = useRouter();
  const { activeBooking, completeBooking } = useCart();

  const handleSubmit = (data: BillingFormData) => {
    completeBooking(data);
    router.push("/confirmation");
  };

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
        >
          {/* Left Column: Billing Details Form */}
          <BillingForm onSubmit={handleSubmit} />

          {/* Right Column: Tour Details Summary */}
          <CheckoutTourSummary booking={activeBooking} />
        </motion.div>
      </div>
    </div>
  );
}
