"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CartItem } from "@/context/CartContext";
import CartItemCard from "./CartItemCard";
import BookingSummary from "./BookingSummary";

import { useLanguage } from "@/context/LanguageContext";

interface CartFilledProps {
  cartItems: CartItem[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function CartFilled({ cartItems }: CartFilledProps) {
  const { t } = useLanguage();

  return (
    <>
      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Cart Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-8 space-y-4"
        >
          {cartItems.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </motion.div>

        {/* Right Column: Booking Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="lg:col-span-4"
        >
          <BookingSummary />
        </motion.div>
      </div>

      {/* Bottom Centered Action Button */}
      <div className="mt-12 sm:mt-16 flex justify-center">
        <Link
          href="/checkout"
          className="inline-flex items-center justify-center gap-2 px-10 sm:px-14 py-3 rounded-full border border-[#0f4c5c] text-[#0f4c5c] font-roboto font-medium text-sm sm:text-base hover:bg-[#0f4c5c] hover:text-white transition-all duration-200 shadow-xs group"
        >
          <span>{t("booking.proceedToCheckout", "Proceed to check out")}</span>
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </>
  );
}
