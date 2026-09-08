"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { DestinationItem } from "@/data/destinations";

interface DestinationCardProps {
  dest: DestinationItem;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function DestinationCard({ dest }: DestinationCardProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 22,
      }}
      className="w-full"
    >
      <Link
        href={dest.href}
        className="relative block h-64 sm:h-72 md:h-80 rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
      >
        {/* Background Destination Photo */}
        <Image
          src={dest.image}
          alt={dest.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />


        <div className="absolute bottom-5 left-1/2 -translate-x-1/2  z-10">
          <h3 className="text-white text-3xl sm:text-4xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {dest.name}
          </h3>
        </div>

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Trip Count Pill Badge */}
        <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-10">
          <span className="bg-white/90 backdrop-blur-xs text-[#39CA5B] font-roboto font-semibold text-xs px-3.5 py-1.5 rounded-full shadow-xs">
            {dest.tripCount}{" "}
            {t("destinations.trips", "Trips")}
          </span>
        </div>

      </Link>
    </motion.div >
  );
}