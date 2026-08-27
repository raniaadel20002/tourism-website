"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const services = [
  {
    src: "/images/about/Frame 183.png",
    alt: "Sea Trips - Snorkeling, islands, crystal-clear waters, and relaxation.",
  },
  {
    src: "/images/about/Frame 184.png",
    alt: "Desert Safari - Adventure, culture, and unforgettable desert views",
  },
  {
    src: "/images/about/Frame 185.png",
    alt: "Historical Tours - Explore Egypt's ancient wonders with expert guides",
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
    <div className="w-full flex flex-col items-center py-6 sm:py-10 relative z-2 overflow-hidden bg-white">
      <Image
        src="/images/about/glope.png"
        alt="Discover Stories, Guides & Travel Tips"
        fill
        priority
        className="object-cover object-center z-2 overflow-hidden"
      />
      <motion.h3
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="font-roboto font-medium text-[#000C09] text-2xl sm:text-3xl md:text-[32px] text-center mb-12 sm:mb-16"
      >
        {t("about.whatWeOffer", "What We Offer?")}
      </motion.h3>

      {/* 3 Services Row */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full flex flex-col sm:flex-row flex-wrap lg:flex-nowrap justify-center items-center gap-10 sm:gap-12 lg:gap-16"
      >
        {services.map((service) => (
          <motion.div
            key={service.src}
            variants={cardVariants}
            className="flex flex-col items-center text-center w-full sm:w-[45%] lg:w-[30%] max-w-[280px]"
          >
            <div className="w-full h-auto transition-transform duration-300 hover:scale-105">
              <Image
                src={service.src}
                alt={service.alt}
                width={250}
                height={180}
                className="w-full h-auto object-contain mx-auto"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
