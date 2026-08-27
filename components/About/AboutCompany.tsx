"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import AboutInfoCard from "./AboutInfoCard";

const leftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const rightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AboutCompany() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-14 mb-20 sm:mb-24">

      {/* Left Column: Travel Collage Image + Decorative Dotted Line */}
      <motion.div
        className="w-full lg:w-[46%] flex flex-col items-center justify-center relative"
        variants={leftVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="relative w-72 sm:w-96 md:w-[420px] lg:w-[440px] h-auto">
          <Image
            src="/images/about/Group12.png"
            alt="Collage of Egyptian destinations and traveler"
            width={500}
            height={500}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Dotted path extending below collage */}
        <div
          className="absolute sm:w-56 md:w-40 lg:w-65 top-100 right-12 h-auto opacity-80 z-1 overflow-hidden"
          aria-hidden="true"
        >
          <Image
            src="/images/about/Vectorcopy.png"
            alt=""
            width={272}
            height={404}
            className="w-full h-auto object-contain z-1 overflow-hidden"
          />
        </div>
      </motion.div>

      {/* Right Column: Company Story + Mission & Vision Cards */}
      <motion.div
        className="w-full lg:w-[50%] flex flex-col items-start rtl:items-start"
        variants={rightVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h3 className="font-roboto font-medium text-[#000C09] text-2xl sm:text-3xl md:text-[30px] mb-4">
          {t("about.companyTitle", "About Our Company")}
        </h3>

        <p className="font-roboto font-normal text-[#484848] text-sm sm:text-base leading-relaxed mb-8">
          {t("about.companyText", "We believe that travel is more than just visiting places — it's about stories, moments, and memories that last a lifetime. Our team is made up of local experts and travel enthusiasts who know every hidden gem, every perfect timing, and every detail that turns a trip into an experience.")}
        </p>

        <motion.div
          className="w-full flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants}>
            <AboutInfoCard
              title={t("about.missionTitle", "Our Mission")}
              body={t("about.missionText", "To provide authentic, safe, and inspiring travel experiences that allow every visitor to explore Egypt with confidence, comfort, and unforgettable memories.")}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <AboutInfoCard
              title={t("about.visionTitle", "Our Vision")}
              body={t("about.visionText", "To become Egypt's most trusted travel platform by connecting travelers with extraordinary destinations, exceptional service, and meaningful cultural experiences.")}
            />
          </motion.div>
        </motion.div>

      </motion.div>

    </div>
  );
}
