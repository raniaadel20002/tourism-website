"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function GalleryHero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-[#003853] pt-24 sm:pt-28 lg:pt-28 pb-10 sm:pb-12 lg:pb-12 min-h-[360px] sm:min-h-[400px] lg:min-h-[420px] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 relative z-10 w-full">

        {/* Hero Left Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full lg:w-[48%] flex flex-col items-start text-left rtl:text-right z-10"
        >
          <span className="font-montez text-[#39CA5B] text-3xl sm:text-4xl md:text-5xl font-normal leading-tight mb-2 tracking-wide">
            {t("gallery.heroSubtitle", "Travel Moments")}
          </span>
          <h1 className="font-roboto font-semibold text-white text-3xl sm:text-4xl md:text-5xl lg:text-[48px] leading-tight tracking-tight drop-shadow-md">
            {t("gallery.heroTitle", "Explore Egypt Through Our Lens")}
          </h1>
        </motion.div>

        {/* Hero Right: Overlapping Rotated Images + Camera Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full lg:w-[50%] flex justify-center lg:justify-end items-center relative min-h-[240px] sm:min-h-[280px] md:min-h-[300px] z-10 select-none"
        >
          <div className="relative w-[300px] sm:w-[400px] md:w-[460px] h-[210px] sm:h-[250px] md:h-[270px]">

            {/* Photo 1: Top Left Swimmer */}
            <div className="absolute top-0 left-6 sm:left-10 w-36 sm:w-48 h-26 sm:h-34 rounded-xl overflow-hidden border-[3px] sm:border-4 border-white shadow-xl -rotate-6 transition-transform duration-300 hover:scale-105 z-10">
              <Image src="/images/home/Gallery/Frame1171276587.png" alt="Travel Moment 1" fill className="object-cover" />
            </div>

            {/* Photo 2: Top Right Diver */}
            <div className="absolute top-2 right-10 sm:right-14 w-32 sm:w-44 h-24 sm:h-32 rounded-xl overflow-hidden border-[3px] sm:border-4 border-white shadow-xl rotate-3 transition-transform duration-300 hover:scale-105 z-10">
              <Image src="/images/home/Gallery/Frame1171276589.png" alt="Travel Moment 2" fill className="object-cover" />
            </div>

            {/* Photo 3: Center Scuba Divers Circle */}
            <div className="absolute bottom-2 left-18 sm:left-22 w-40 sm:w-52 h-28 sm:h-36 rounded-xl overflow-hidden border-[3px] sm:border-4 border-white shadow-2xl -rotate-12 transition-transform duration-300 hover:scale-105 z-20">
              <Image src="/images/home/Gallery/6ad7f35add4c0722da04a0431f5c2163 1.png" alt="Travel Moment 3" fill className="object-cover" />
            </div>

            {/* Photo 4: Right Flyboard Rider */}
            <div className="absolute bottom-1 right-2 sm:right-4 w-32 sm:w-44 h-26 sm:h-34 rounded-xl overflow-hidden border-[3px] sm:border-4 border-white shadow-xl rotate-12 transition-transform duration-300 hover:scale-105 z-20">
              <Image src="/images/home/Gallery/Frame1171276588.png" alt="Travel Moment 4" fill className="object-cover" />
            </div>

            {/* Foreground Camera Graphic */}
            <div className="absolute -bottom-2 -left-4 sm:left-0 w-28 sm:w-36 md:w-40 h-auto z-30 drop-shadow-2xl">
              <Image
                src="/images/gallaryCamera.png"
                alt="Vintage Camera"
                width={200}
                height={140}
                className="w-full h-auto object-contain -rotate-90 origin-center scale-110"
              />
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
