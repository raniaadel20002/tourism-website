"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactHero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-[#003853] pt-0 sm:pt-0 lg:pt-0 pb-0 sm:pb-0 lg:pb-0 min-h-[360px] sm:min-h-[400px] lg:min-h-[420px] flex items-center overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-2 w-full">

        {/* Hero Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full md:w-[60%] lg:w-[55%] flex flex-col items-start text-left rtl:text-right"
        >
          <span className="font-montez text-[#69DD84] text-3xl sm:text-4xl md:text-5xl font-normal leading-tight mb-2 tracking-wide">
            {t("contact.heroSubtitle", "Get in Touch")}
          </span>
          <h1 className="font-roboto font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-[48px] leading-tight tracking-tight drop-shadow-sm mb-3">
            {t("contact.heroTitle", "Let's Start Your Next Adventure")}
          </h1>
          <p className="font-roboto font-normal text-white/90 text-sm sm:text-base leading-relaxed max-w-xl">
            {t("contact.heroText", "Whether you're planning your dream vacation, looking for the perfect tour, or simply have a question, our team is here to help. Reach out to us, and let's create unforgettable memories together.")}
          </p>
        </motion.div>

        {/* Hero Right: Phone Image + Soundwave Squiggles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full md:w-[35%] lg:w-[32%] flex justify-center items-center md:justify-end relative select-none"
        >
          <div className="relative w-28 sm:w-36 md:w-40 lg:w-26 flex justify-center">

            {/* Green Telephone Handset with Cord */}
            <Image
              src="/images/contact/a30531347a56ee917b0d45426ea275a5f70609b7.png"
              alt="Green vintage telephone"
              width={208}
              height={316}
              priority
              className="w-full h-auto object-contain drop-shadow-xl"
            />

            {/* Soundwaves Squiggles positioned to the left of the mouthpiece */}
            <div className="absolute -left-16 sm:-left-20 bottom-8 sm:bottom-12 w-12 sm:w-16">
              <Image
                src="/images/contact/Group 13.png"
                alt=""
                width={68}
                height={60}
                className="w-full h-auto object-contain"
              />
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
