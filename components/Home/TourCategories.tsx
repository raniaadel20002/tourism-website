"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getTripTypes } from "@/api/tripType";
import type { TripType } from "@/modules/tripType.model";
import CategoryCard from "@/components/Home/CategoryCard";

export interface TourCategoryItem { id: string; name: string; image: string; rotation: string; }
const rotations = ["-rotate-[4deg]", "-rotate-[2deg]", "rotate-[2deg]", "rotate-[4deg]"];
const imageByName: Record<string, string> = {
  diving: "/images/home/categories/diving.jpg",
  snorkelling: "/images/home/categories/Snorkelling.jpg",
  safari: "/images/home/categories/DesertSafari.jpg",
};
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const headerVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

export default function TourCategories() {
  const { t, language } = useLanguage();
  const [types, setTypes] = useState<TripType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    void getTripTypes(undefined, { pageNumber: 1, pageSize: 100, lang: language })
      .then((items) => {
        if (!cancelled) setTypes(items);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : t("categories.failedToLoad", "Failed to load trip types."));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [language, t]);

  const items: TourCategoryItem[] = types.map((type, index) => ({
    id: String(type.id),
    name: type.name,
    image: imageByName[type.name.toLowerCase()] ?? "/images/home/categories/BoatTrip.jpg",
    rotation: rotations[index % rotations.length],
  }));

  return (
    <section className="w-full py-10 sm:py-12 lg:py-14 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <motion.div
          className="flex flex-col items-center text-center mb-8 sm:mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants as Variants}
        >
          <span className="font-montez text-[#39CA5B] text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight mb-1 tracking-wide">
            {t("categories.subtitle", "Handpicked Adventures")}
          </span>
          <h2 className="font-roboto text-[#006993] text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-tight mb-2.5">
            {t("categories.title", "Tour Categories")}
          </h2>
          <div className="w-16 sm:w-20 h-1 sm:h-1.5 bg-[#39CA5B] rounded-full" />
        </motion.div>
        <motion.div
          className="w-full flex flex-row items-center justify-start sm:justify-center gap-5 sm:gap-6 lg:gap-8 xl:gap-10 overflow-x-auto lg:overflow-visible pb-4 pt-1 px-2 scrollbar-none snap-x"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {loading && <div className="h-56 w-44 rounded-[28px] bg-gray-100 animate-pulse" />}
          {!loading && error && <p className="w-full text-center text-sm text-red-500">{error}</p>}
          {!loading && !error && items.length === 0 && (
            <p className="w-full text-center text-sm text-gray-500">
              {t("categories.noTripTypes", "No trip types are available yet.")}
            </p>
          )}
          {items.map((item, index) => (
            <CategoryCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}