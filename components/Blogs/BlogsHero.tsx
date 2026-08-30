"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function BlogsHero() {
  const { t } = useLanguage();

  return (
    <div className="relative w-full h-[280px] sm:h-[340px] md:h-[380px] lg:h-[411px] pt-16 flex items-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="/images/blogCover.png"
          alt="Discover Stories, Guides & Travel Tips"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark Overlay for optimal text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Text */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl flex flex-col items-start rtl:items-start"
        >
          <span className="font-montez text-[#69DD84] text-3xl sm:text-4xl md:text-5xl font-normal leading-tight mb-1 sm:mb-2">
            {t("blogs.heroSubtitle", "Explore Articles")}
          </span>
          <h1 className="font-roboto font-semibold text-white text-3xl sm:text-4xl md:text-5xl lg:text-[50px] leading-tight tracking-tight drop-shadow-md">
            {t("blogs.heroTitle", "Discover Stories, Guides & Travel Tips")}
          </h1>
        </motion.div>
      </div>
    </div>
  );
}
