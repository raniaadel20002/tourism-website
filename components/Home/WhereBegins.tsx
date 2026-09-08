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
    <section className="relative w-full bg-[#003853] py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* ── Top-Left Decorative Airplane ── */}
      <div
        className="absolute -top-4 left-0 lg:-top-6 lg:left-45 w-28 sm:w-36 lg:w-44 h-auto pointer-events-none select-none opacity-75 z-20"
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
        className="absolute -bottom-6 -right-6 sm:-bottom-8 lg:right-45 sm:-right-8 w-32 sm:w-40 lg:w-48 h-auto pointer-events-none select-none z-0  opacity-75 z-30"
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
        className="relative z-10 max-w-5xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl"
        variants={bannerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >

        {/* Banner Background Image */}
        <div className="relative w-full min-h-[200px] sm:min-h-[230px] md:min-h-[260px] lg:min-h-[280px] flex items-center">
          <Image
            src="/images/home/whereBegins/Frame 1171276613 (1).png"
            alt={t("whereBegins.title", "Where Your Adventure Begins")}
            fill
            priority
            className="object-cover object-center"
          />

          {/* ── Flexbox Content Container ── */}
          <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-8 lg:px-12 py-6 sm:py-8">

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
                className="font-roboto font-bold text-[#FDFEFF] text-xl sm:text-2xl md:text-3xl lg:text-[34px] leading-tight tracking-tight mb-1.5 sm:mb-2 drop-shadow-md"
              >
                {t("whereBegins.title", "Where Your Adventure Begins")}
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="font-roboto font-normal text-[#FFFFFF] text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 max-w-md opacity-95"
              >
                {t("whereBegins.desc", "Choose from Egypt's most exciting travel experiences.")}
              </motion.p>

              {/* CTA Button */}
              <motion.div variants={itemVariants}>
                <Link
                  href="/trips"
                  className="inline-block bg-white text-[#004560] font-roboto font-semibold text-xs sm:text-sm px-6 sm:px-8 py-2.5 sm:py-3 rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-200"
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

