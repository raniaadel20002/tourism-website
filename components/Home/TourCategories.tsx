"use client";

import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import CategoryCard from "@/components/Home/CategoryCard";

export interface TourCategoryItem {
  id: string;
  name: string;
  image: string;
  rotation: string;
}

const categoryItems: TourCategoryItem[] = [
  {
    id: "diving",
    name: "Diving",
    image: "/images/home/categories/diving.jpg",
    rotation: "-rotate-[4deg]",
  },
  {
    id: "boat-trip",
    name: "Boat Trip",
    image: "/images/home/categories/BoatTrip.jpg",
    rotation: "-rotate-[2deg]",
  },
  {
    id: "snorkelling",
    name: "Snorkelling",
    image: "/images/home/categories/Snorkelling.jpg",
    rotation: "rotate-[2deg]",
  },
  {
    id: "desert-safari",
    name: "Desert Safari",
    image: "/images/home/categories/DesertSafari.jpg",
    rotation: "rotate-[4deg]",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function TourCategories() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-10 sm:py-12 lg:py-14 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Centered Section Header */}
        <motion.div
          className="flex flex-col items-center text-center mb-8 sm:mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants as Variants}
        >
          {/* Small Title */}
          <span className="font-montez text-[#39CA5B] text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight mb-1 tracking-wide">
            {t("categories.subtitle", "Handpicked Adventures")}
          </span>

          {/* Main Title */}
          <h2 className="font-roboto text-[#006993] text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-tight mb-2.5">
            {t("categories.title", "Tour Categories")}
          </h2>

          {/* Decorative Underline */}
          <div className="w-16 sm:w-20 h-1 sm:h-1.5 bg-[#39CA5B] rounded-full" />
        </motion.div>

        {/* Categories Flex Layout (Flexbox only) */}
        <motion.div
          className="w-full flex flex-row items-center justify-start sm:justify-center gap-5 sm:gap-6 lg:gap-8 xl:gap-10 overflow-x-auto lg:overflow-visible pb-4 pt-1 px-2 scrollbar-none snap-x"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {categoryItems.map((item, index) => (
            <CategoryCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
