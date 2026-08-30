"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
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
  const { t } = useLanguage();

  return (
    <motion.div
      variants={cardVariants}
      className="flex flex-col items-center flex-shrink-0 cursor-pointer group snap-center"
    >
      <Link href="/trips" className="flex flex-col items-center w-full outline-none focus:outline-none">
        {/* Rotated Image Card with hover scale */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`relative w-36 h-48 sm:w-44 sm:h-56 lg:w-[185px] lg:h-[235px] rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300 ${item.rotation}`}
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
        <span className="font-roboto font-semibold text-[#16181E] text-sm sm:text-base lg:text-[17px] mt-3 sm:mt-3.5 text-center transition-colors duration-200 group-hover:text-[#006993]">
          {t(`categories.${item.id}`, item.name)}
        </span>
      </Link>
    </motion.div>
  );
}
