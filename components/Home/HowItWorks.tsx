"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface Step {
  id: number;
  icon: string;
  titleKey: string;
  defaultTitle: string;
  descKey: string;
  defaultDesc: string;
}

const steps: Step[] = [
  {
    id: 1,
    icon: "/images/home/howItWorks/icon1.png",
    titleKey: "howItWorks.step1Title",
    defaultTitle: "Choose an Experience",
    descKey: "howItWorks.step1Desc",
    defaultDesc: "Browse adventures that match your travel style.",
  },
  {
    id: 2,
    icon: "/images/home/howItWorks/icon2.png",
    titleKey: "howItWorks.step2Title",
    defaultTitle: "Reserve Securely",
    descKey: "howItWorks.step2Desc",
    defaultDesc: "Book safely using trusted payment methods.",
  },
  {
    id: 3,
    icon: "/images/home/howItWorks/icon3.png",
    titleKey: "howItWorks.step3Title",
    defaultTitle: "Receive Instant Confirmation",
    descKey: "howItWorks.step3Desc",
    defaultDesc: "Your itinerary arrives instantly in your inbox.",
  },
  {
    id: 4,
    icon: "/images/home/howItWorks/icon4.png",
    titleKey: "howItWorks.step4Title",
    defaultTitle: "Enjoy the Journey",
    descKey: "howItWorks.step4Desc",
    defaultDesc: "Pack your bags — we'll take care of the rest.",
  },
];

/* ─── Framer Motion Variants ─── */
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function HowItWorksCard({ step }: { step: Step }) {
  const { t } = useLanguage();

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="relative w-full max-w-[260px] h-[160px] bg-white rounded-[16px] px-3 pt-9 pb-3 flex flex-col items-center justify-center text-center shadow-md"
    >
      {/* Centered green icon placed inside top decorative shape */}
      <div className="absolute -top-[48px] left-1/2 -translate-x-1/2 w-[85px] h-[85px] z-10 flex items-center justify-center pointer-events-none">
        <Image
          src={step.icon}
          alt={t(step.titleKey, step.defaultTitle)}
          width={140}
          height={140}
          className="w-[140px] h-[140px] object-contain scale-105"
        />
      </div>

      {/* Card Title */}
      <h3
        className="text-[#000C09] text-[15px] sm:text-[16px] font-semibold leading-[130%] text-center font-roboto mb-1 whitespace-nowrap"
        style={{ fontFamily: "var(--font-roboto), Roboto, sans-serif" }}
      >
        {t(step.titleKey, step.defaultTitle)}
      </h3>

      {/* Card Description */}
      <p
        className="text-[#000C09] text-[12px] sm:text-[13px] font-normal leading-[140%] text-center font-roboto max-w-[210px]"
        style={{ fontFamily: "var(--font-roboto), Roboto, sans-serif" }}
      >
        {t(step.descKey, step.defaultDesc)}
      </p>
    </motion.div>
  );
}

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-[#13445d] py-12 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decorative Shape from heart.svg */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <img
          src="/images/home/bestselling/heart.svg"
          alt=""
          className="w-full h-full object-cover object-center max-w-[1500px]"
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-4 sm:mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
        >
          {/* Small Decorative Subtitle */}
          <p
            className="text-[#69DD84] text-2xl sm:text-3xl font-normal leading-[140%] text-center font-montez"
            style={{ fontFamily: "var(--font-montez), Montez, cursive" }}
          >
            {t("howItWorks.subtitle", "Book Your Adventure in Minutes")}
          </p>

          {/* Main Title */}
          <h2
            className="text-[#F5F9FF] text-2xl sm:text-3xl lg:text-[36px] font-semibold leading-[140%] text-center font-roboto mb-2"
            style={{ fontFamily: "var(--font-roboto), Roboto, sans-serif" }}
          >
            {t("howItWorks.title", "How It Works")}
          </h2>

          {/* Green Horizontal Line */}
          <div className="mt-1 mx-auto w-16 sm:w-20 h-1 sm:h-1.5 bg-[#69DD84] rounded-full" />
        </motion.div>

        {/* 4-Card Responsive Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-16 justify-items-center mt-16 sm:mt-18"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
        >
          {steps.map((step) => (
            <HowItWorksCard key={step.id} step={step} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

