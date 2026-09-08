"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutHero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-[#003853] pt-0 sm:pt-0 lg:pt-0 pb-0 sm:pb-0 lg:pb-0 min-h-[360px] sm:min-h-[400px] lg:min-h-[320px] flex items-center overflow-hidden">
      {/* Decorative Dotted Path across Hero */}
      <div
        className="absolute bottom-0 right-0 lg:left-[45%] w-[340px] sm:w-[480px] lg:w-[420px] h-auto pointer-events-none select-none z-0 opacity-80"
        aria-hidden="true"
      >
        <Image
          src="/images/about/Vector (1).png"
          alt=""
          width={488}
          height={227}
          className="w-full h-auto z-10 object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-5 relative z-10 w-full">
        
        {/* Hero Left Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full lg:w-[52%] flex flex-col items-start text-left rtl:text-right"
        >
          <span className="font-montez text-[#69DD84] text-3xl sm:text-4xl md:text-5xl font-normal leading-tight mb-2 tracking-wide">
            {t("about.heroSubtitle", "Our Story")}
          </span>
          <h1 className="font-roboto font-semibold text-white text-3xl sm:text-4xl md:text-5xl lg:text-[48px] leading-tight tracking-tight drop-shadow-md max-w-xl">
            {t("about.heroTitle", "Discover Egypt with People Who Know It Best")}
          </h1>
        </motion.div>

        {/* Hero Right: Airplane Window Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full lg:w-[45%] flex justify-center lg:justify-end items-center relative select-none"
        >
          <div className="relative w-48 sm:w-60 md:w-72 lg:w-[290px] h-auto drop-shadow-2xl">
            <Image
              src="/images/about/image 11.png"
              alt="Airplane window overlooking clouds and aircraft"
              width={320}
              height={400}
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
