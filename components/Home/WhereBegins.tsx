"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

/* ─── Framer Motion Variants ─── */
const bannerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function WhereBegins() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-[#003853] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* ── Top-Left Decorative Airplane ── */}
      <div
        className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-36 sm:w-48 lg:w-56 h-auto pointer-events-none select-none z-0 rotate-[15deg] opacity-75"
        aria-hidden="true"
      >
        <Image
          src="/images/home/whereBegins/Vector.svg"
          alt=""
          width={175}
          height={155}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* ── Bottom-Right Decorative Airplane ── */}
      <div
        className="absolute -bottom-8 -right-8 sm:-bottom-10 sm:-right-10 w-40 sm:w-52 lg:w-60 h-auto pointer-events-none select-none z-0 -rotate-[165deg] opacity-75"
        aria-hidden="true"
      >
        <Image
          src="/images/home/whereBegins/Vector.svg"
          alt=""
          width={175}
          height={155}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* ── Main Rounded Banner Container ── */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden shadow-2xl"
        variants={bannerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >

        {/* Banner Background Image */}
        <div className="relative w-full min-h-[260px] sm:min-h-[300px] md:min-h-[340px] lg:min-h-[380px] flex items-center">
          <Image
            src="/images/home/whereBegins/Frame 1171276613 (1).png"
            alt="Where Your Adventure Begins"
            fill
            priority
            className="object-cover object-center"
          />

          {/* ── Flexbox Content Container ── */}
          <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 py-8 sm:py-10">

            {/* Left side space for suitcase visual from background image */}
            <div className="hidden md:block w-1/2" aria-hidden="true" />

            {/* Right side Text & CTA — staggered entrance */}
            <motion.div
              className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >

              {/* Main Title */}
              <motion.h2
                variants={itemVariants}
                className="font-roboto font-bold text-[#FDFEFF] text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-tight tracking-tight mb-2 sm:mb-3 drop-shadow-md"
              >
                {t("whereBegins.title", "Where Your Adventure Begins")}
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="font-roboto font-normal text-[#FFFFFF] text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-7 max-w-md opacity-95"
              >
                {t("whereBegins.desc", "Choose from Egypt's most exciting travel experiences.")}
              </motion.p>

              {/* CTA Button */}
              <motion.div variants={itemVariants}>
                <Link
                  href="/trips"
                  className="inline-block bg-white text-[#004560] font-roboto font-semibold text-xs sm:text-sm md:text-[15px] px-8 sm:px-10 py-3 sm:py-3.5 rounded-full shadow-md hover:shadow-xl hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  {t("whereBegins.cta", "Explore Tour Now")}
                </Link>
              </motion.div>

            </motion.div>

          </div>

        </div>

      </motion.div>

    </section>
  );
}

