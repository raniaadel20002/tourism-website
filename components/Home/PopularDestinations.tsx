"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface Destination {
  id: string;
  name: string;
  image: string;
  href: string;
}

const destinationsData: Destination[] = [
  {
    id: "hurghada",
    name: "Hurghada",
    image: "/images/home/PopularDestinations/hurghada.png",
    href: "/destinations/hurghada",
  },
  {
    id: "giza",
    name: "Giza",
    image: "/images/home/PopularDestinations/giza.png",
    href: "/destinations/giza",
  },
  {
    id: "aswan",
    name: "Aswan",
    image: "/images/home/PopularDestinations/aswan.png",
    href: "/destinations/aswan",
  },
];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function PopularDestinations() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-[#F4F9FB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

        {/* Centered Section Header */}
        <motion.div
          className="flex flex-col items-center text-center mb-8 sm:mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
        >
          {/* Small Title */}
          <span className="font-montez text-[#39CA5B] text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight mb-1 tracking-wide">
            {t("destinations.subtitle", "Explore Egypt's Hidden Gems")}
          </span>

          {/* Main Title */}
          <h2 className="font-roboto text-[#006993] text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight mb-3">
            {t("destinations.title", "Popular destinations")}
          </h2>

          {/* Decorative Underline */}
          <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-[#39CA5B] rounded-full" />
        </motion.div>

        {/* View More Button Row (Aligned to the Right above cards) */}
        <div className="w-full flex justify-end mb-6 sm:mb-8 px-2 sm:px-0">
          <Link
            href="/destinations"
            className="border border-[#006993] text-[#006993] hover:bg-[#006993] hover:text-white font-roboto font-medium text-sm sm:text-base px-6 sm:px-7 py-2 sm:py-2.5 rounded-full transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
          >
            {t("bestselling.moreTours", "View More")}
          </Link>
        </div>

        {/* Destination Cards Flexbox Layout (Flexbox only, no Grid) */}
        <motion.div
          className="w-full flex flex-row items-center justify-start md:justify-center gap-5 sm:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible pb-6 pt-2 px-2 scrollbar-none "
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {destinationsData.map((dest) => (
            <motion.div
              key={dest.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="flex-shrink-0 w-[290px] sm:w-[330px] md:flex-1 md:w-auto md:max-w-[400px] snap-center cursor-pointer group"
            >
              <Link href={dest.href} className="block w-full">
                <div className="relative w-full h-[360px] sm:h-[400px] lg:h-[420px] rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-md group-hover:shadow-2xl transition-shadow duration-300 bg-gray-200">
                  {/* Destination Image with baked-in title from design assets */}
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    sizes="(max-width: 768px) 30px, 33vw"
                    className="object-contain group-hover:scale-108 transition-transform duration-700 ease-out"
                    priority
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
