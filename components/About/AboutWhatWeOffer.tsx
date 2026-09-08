"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const services = [
  {
    src: "/images/about/icon-sea.png",
    titleKey: "about.offerSeaTitle",
    descKey: "about.offerSeaDesc",
  },
  {
    src: "/images/about/icon-safari.png",
    titleKey: "about.offerSafariTitle",
    descKey: "about.offerSafariDesc",
  },
  {
    src: "/images/about/icon-history.png",
    titleKey: "about.offerHistoryTitle",
    descKey: "about.offerHistoryDesc",
  },
];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AboutWhatWeOffer() {
  const { t } = useLanguage();

  return (
    <div className="w-full flex flex-col items-center text-left rtl:text-right py-6 sm:py-10 relative z-2 overflow-hidden bg-white">
      <Image
        src="/images/about/glope.png"
        alt=""
        fill
        priority
        className="object-cover object-center z-0 text-left rtl:text-right overflow-hidden pointer-events-none select-none opacity-40"
      />
      <motion.h3
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="font-roboto font-medium text-[#000C09] text-2xl sm:text-3xl md:text-[32px] text-center mb-12 sm:mb-16 relative z-10"
      >
        {t("about.whatWeOffer", "What We Offer?")}
      </motion.h3>

      {/* 3 Services Row */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full flex flex-col sm:flex-row flex-wrap lg:flex-nowrap justify-center items-center gap-10 sm:gap-12 lg:gap-16 relative z-10"
      >
        {services.map((service) => (
          <motion.div
            key={service.titleKey}
            variants={cardVariants}
            className="flex flex-col items-center text-center w-full sm:w-[45%] lg:w-[30%] max-w-[280px]"
          >
            <div className="w-28 sm:w-32 h-auto transition-transform duration-300 hover:scale-105 mb-3">
              <Image
                src={service.src}
                alt={t(service.titleKey)}
                width={140}
                height={100}
                className="w-full h-auto object-contain mx-auto"
              />
            </div>
            <h4 className="font-roboto font-medium text-[#000C09] text-lg sm:text-xl mb-2">
              {t(service.titleKey)}
            </h4>
            <p className="font-roboto font-normal text-[#484848] text-sm sm:text-base leading-relaxed">
              {t(service.descKey)}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
