"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface Destination {
  id: string;
  nameKey: string;
  fallbackName: string;
  cardImage: string;
  heroBg: string;
}

const destinations: Destination[] = [
  {
    id: "red-sea",
    nameKey: "destinations.redSea",
    fallbackName: "Red Sea",
    cardImage: "/images/home/hero/redsea.png",
    heroBg: "/images/home/hero/background.png",
  },
  {
    id: "luxor",
    nameKey: "destinations.luxor",
    fallbackName: "Luxor",
    cardImage: "/images/home/hero/luxor.png",
    heroBg: "/images/home/hero/luxor-bg.jpg",
  },
  {
    id: "giza",
    nameKey: "destinations.giza",
    fallbackName: "Giza",
    cardImage: "/images/home/hero/giza.png",
    heroBg: "/images/home/hero/giza-bg.png",
  },
];

/* ─── Framer Motion Animation Variants ─── */
const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const sliderEntranceVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % destinations.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % destinations.length);
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-teal-950">
      {/* ── Background Crossfade Layers ── */}
      {destinations.map((dest, index) => (
        <div
          key={dest.id}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out pointer-events-none"
          style={{
            backgroundImage: `url('${dest.heroBg}')`,
            opacity: activeIndex === index ? 1 : 0,
            zIndex: activeIndex === index ? 1 : 0,
          }}
        />
      ))}

      {/* ── Dark Gradient & Vignette Overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10 z-[2] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-[2] pointer-events-none" />

      {/* ── Hero Main Content (Flexbox Only) ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-12 sm:pb-16 flex-1 flex flex-col justify-between">
        <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-10 lg:gap-8">
          
          {/* Left: Typography & CTA */}
          <motion.div
            className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl self-center lg:self-center"
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Small Title */}
            <motion.span
              variants={textItemVariants}
              className="font-montez text-[#39CA5B] text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight mb-2 tracking-wide drop-shadow"
            >
              {t("hero.explore", "Explore")}
            </motion.span>

            {/* Main Title */}
            <motion.h1
              variants={textItemVariants}
              className="font-roboto text-[#FFF8F8] text-3xl text-left rtl:text-right sm:text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.12] mb-4 sm:mb-5 tracking-tight drop-shadow-md"
            >
              {t("hero.titleLine1", "Every Journey Has a Story.")}
              <br className="hidden sm:inline" />
              {" "}
              {t("hero.titleLine2", "Start Yours in Egypt.")}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={textItemVariants}
              className="font-roboto text-[#FFF8F8] text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 max-w-md drop-shadow"
            >
              {t("hero.desc", "From the golden dunes of the Sahara to the vibrant coral reefs of the Red Sea, discover unforgettable adventures crafted for every traveler.")}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={textItemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Link
                href="/trips"
                className="inline-flex items-center justify-center bg-[#F5FCFF] text-[#00266D] font-roboto font-semibold text-sm sm:text-base px-8 sm:px-10 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-shadow duration-300"
              >
                {t("hero.exploreTrips", "Explore Trips")}
              </Link>
            </motion.div>

            {/* Previous / Next Arrow Buttons positioned below CTA */}
            <motion.div
              variants={textItemVariants}
              className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 mt-6 sm:mt-8"
            >
              <motion.button
                type="button"
                onClick={handlePrev}
                aria-label={t("hero.previousDestination", "Previous destination")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#39CA5B]"
              >
                <img
                  src={isRTL ? "/images/home/hero/➡.png" : "/images/home/hero/⬅.png"}
                  alt={t("hero.previous", "Previous")}
                  className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-md group-hover:brightness-110 transition-[filter] duration-200"
                />
              </motion.button>

              <motion.button
                type="button"
                onClick={handleNext}
                aria-label={t("hero.nextDestination", "Next destination")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#39CA5B]"
              >
                <img
                  src={isRTL ? "/images/home/hero/⬅.png" : "/images/home/hero/➡.png"}
                  alt={t("hero.next", "Next")}
                  className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-md group-hover:brightness-110 transition-[filter] duration-200"
                />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right: Destination Cards Slider */}
          <motion.div
            className="flex flex-col items-center lg:items-end gap-3 sm:gap-4 w-full lg:w-auto"
            variants={sliderEntranceVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Destination Cards Row (Horizontal Flex) */}
            <div className="flex flex-row items-end justify-center lg:justify-end gap-3 sm:gap-4 lg:gap-5 w-full overflow-x-auto lg:overflow-visible pb-2 px-2 scrollbar-none">
              {destinations.map((dest, index) => {
                const isActive = activeIndex === index;
                return (
                  <motion.button
                    key={dest.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`${t("hero.select", "Select")} ${t(dest.nameKey, dest.fallbackName)}`}
                    whileHover={!isActive ? { scale: 1.05, opacity: 1 } : {}}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className={`relative rounded-[20px] sm:rounded-[24px] overflow-hidden cursor-pointer flex-shrink-0 transition-all duration-500 ease-out focus:outline-none ${
                      isActive
                        ? "w-40 sm:w-48 lg:w-56 h-60 sm:h-72 lg:h-[340px] shadow-2xl ring-2 ring-white/70 z-10"
                        : "w-28 sm:w-36 lg:w-44 h-44 sm:h-56 lg:h-[260px] opacity-80 shadow-lg"
                    }`}
                  >
                    <img
                      src={dest.cardImage}
                      alt={t(dest.nameKey, dest.fallbackName)}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out"
                    />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
