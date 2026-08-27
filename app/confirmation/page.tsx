"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import ConfirmationTripImage from "@/components/Checkout/ConfirmationTripImage";
import ConfirmationMessage from "@/components/Checkout/ConfirmationMessage";

export default function ConfirmationPage() {
  const { confirmedBooking, activeBooking } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use confirmed booking data or fall back to active booking
  const tripTitle =
    confirmedBooking?.tripTitle || activeBooking.tripTitle || "Luxor Full-Day Heritage Tour";
  const tripImage =
    confirmedBooking?.tripImage ||
    activeBooking.tripImage ||
    "/images/home/bestselling/LuxorDayTour.jpg";
  const tourDate =
    confirmedBooking?.tourDate || activeBooking.tourDate || "23/1/2025";
  const totalAmount =
    confirmedBooking?.totalAmount || activeBooking.totalAmount || 65;
  const bookingId = confirmedBooking?.bookingId || "BK-782914";

  return (
    <div className="min-h-screen bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24 pb-16">
      {/* Modal / Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-[32px] sm:rounded-[40px] max-w-3xl w-full p-6 sm:p-10 md:p-12 relative shadow-2xl overflow-hidden border border-slate-100 flex flex-col items-center justify-between min-h-[500px] sm:min-h-[580px]"
      >
        {/* Top-Right Close Button */}
        <Link
          href="/"
          className="absolute top-6 right-6 sm:top-8 sm:right-8 text-slate-800 hover:text-black p-2 rounded-full hover:bg-slate-100 transition-colors z-20 cursor-pointer"
          aria-label="Close confirmation"
        >
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 stroke-slate-900"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>

        {/* Dynamic Trip Image */}
        <ConfirmationTripImage
          src={tripImage}
          tripTitle={tripTitle}
          tourDate={tourDate}
          totalAmount={totalAmount}
        />

        {/* Confirmation Message & Actions */}
        <ConfirmationMessage bookingId={bookingId} />

      </motion.div>
    </div>
  );
}
