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
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="relative w-full max-w-[295px] h-[200px] bg-white rounded-[16px] px-3 pt-12 pb-5 flex flex-col items-center justify-center text-center shadow-lg"
    >
      {/* Centered green icon placed inside top decorative shape */}
      <div className="absolute -top-[65px] left-1/2 -translate-x-1/2 w-[110px] h-[110px] z-10 flex items-center justify-center pointer-events-none">
        <Image
          src={step.icon}
          alt={t(step.titleKey, step.defaultTitle)}
          width={190}
          height={190}
          className="w-[190px] h-[190px] object-contain scale-110"
        />
      </div>

      {/* Card Title */}
      <h3
        className="text-[#000C09] text-[18px] sm:text-[19px] lg:text-[19.5px] font-medium leading-[140%] text-center font-roboto mb-2 whitespace-nowrap"
        style={{ fontFamily: "var(--font-roboto), Roboto, sans-serif" }}
      >
        {t(step.titleKey, step.defaultTitle)}
      </h3>

      {/* Card Description */}
      <p
        className="text-[#000C09] text-[15px] sm:text-[16px] font-normal leading-[150%] text-center font-roboto max-w-[245px]"
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
    <section className="relative bg-[#13445d] py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-x-clip">
      {/* Background Decorative Shape from heart.svg */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1358px] pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <Image
          src="/images/howItWorks/heart.svg"
          alt=""
          width={1358}
          height={1133}
          className="w-full h-auto object-top"
          priority
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
        >
          {/* Small Decorative Subtitle */}
          <p
            className="text-[#69DD84] text-[32px] sm:text-[36px] font-normal leading-[160%] text-center font-montez"
            style={{ fontFamily: "var(--font-montez), Montez, cursive" }}
          >
            {t("howItWorks.subtitle", "Book Your Adventure in Minutes")}
          </p>

          {/* Main Title */}
          <h2
            className="text-[#F5F9FF] text-[34px] sm:text-[40px] font-semibold leading-[160%] text-center font-roboto"
            style={{ fontFamily: "var(--font-roboto), Roboto, sans-serif" }}
          >
            {t("howItWorks.title", "How It Works")}
          </h2>

          {/* Green Horizontal Line */}
          <div className="mt-1 mx-auto w-[117px] h-[8px] bg-[#69DD84] rounded-[4px]" />
        </motion.div>

        {/* 4-Card Responsive Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-20 justify-items-center mt-24"
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

