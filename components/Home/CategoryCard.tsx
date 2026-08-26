"use client";

import { motion, Variants } from "framer-motion";
import type { TourCategoryItem } from "@/components/Home/TourCategories";

interface CategoryCardProps {
  item: TourCategoryItem;
  index?: number;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function CategoryCard({ item }: CategoryCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className="flex flex-col items-center flex-shrink-0 cursor-pointer group snap-center"
    >
      {/* Rotated Image Card with hover scale */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative w-44 h-56 sm:w-52 sm:h-64 lg:w-[220px] lg:h-[275px] rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300 ${item.rotation}`}
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Subtle hover brightness / overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </motion.div>

      {/* Category Name */}
      <span className="font-roboto font-semibold text-[#16181E] text-base sm:text-lg lg:text-xl mt-4 sm:mt-5 text-center transition-colors duration-200 group-hover:text-[#006993]">
        {item.name}
      </span>
    </motion.div>
  );
}
