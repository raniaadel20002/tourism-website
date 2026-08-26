"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

/* ─── Image pools (Exact assets from public/images/home/Gallery/) ─── */
const leftImages = [
  {
    id: "l1",
    src: "/images/home/Gallery/Frame1171276589.png",
    alt: "Scuba diver underwater",
  },
  {
    id: "l2",
    src: "/images/home/Gallery/Frame1171276587.png",
    alt: "Snorkeler underwater",
  },
  {
    id: "l3",
    src: "/images/home/Gallery/Frame1171276588.png",
    alt: "Flyboarding adventure",
  },
];

const centerImages = [
  {
    id: "c1",
    src: "/images/home/Gallery/6ad7f35add4c0722da04a0431f5c2163 1.png",
    alt: "Group of scuba divers in a circle overhead",
  },
  {
    id: "c2",
    src: "/images/home/Gallery/Frame1171276593.png",
    alt: "Sea turtle swimming in clear waters",
  },
];

const rightImages = [
  {
    id: "r1",
    src: "/images/home/Gallery/Frame1171276592.png",
    alt: "Dolphins swimming in crystal blue water",
  },
  {
    id: "r2",
    src: "/images/home/Gallery/Frame1171276591.png",
    alt: "Ancient Karnak temple columns in Luxor",
  },
  {
    id: "r3",
    src: "/images/home/Gallery/Frame1171276590.png",
    alt: "Luxury yacht sailing on the Red Sea",
  },
];

/* ─── Framer Motion Animation Variants ─── */
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

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

/** Single image card inside marquee */
function MarqueeCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full h-36 sm:h-48 md:h-56 lg:h-64 rounded-2xl sm:rounded-3xl overflow-hidden flex-shrink-0 mb-3 sm:mb-4 lg:mb-5">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 33vw, (max-width: 1024px) 30vw, 25vw"
        className="object-fill"
      />
    </div>
  );
}

/** Infinite vertical marquee scrolling column */
function MarqueeColumn({
  images,
  direction,
}: {
  images: typeof leftImages;
  direction: "up" | "down";
}) {
  // Duplicate the 3 items (6 total) to create a seamless infinite loop with translateY(-50%)
  const doubled = [...images, ...images];

  return (
    <div className="relative overflow-hidden w-full h-full flex-1 rounded-2xl sm:rounded-3xl">
      <div className={direction === "up" ? "marquee-up" : "marquee-down"}>
        {doubled.map((img, idx) => (
          <MarqueeCard key={`${img.id}-${idx}`} src={img.src} alt={img.alt} />
        ))}
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Three columns strictly aligned in a single row using Flexbox only */}
        <div className="flex flex-row flex-nowrap items-stretch justify-center gap-3 sm:gap-4 md:gap-6 w-full h-[460px] sm:h-[560px] md:h-[640px] lg:h-[720px]">

          {/* LEFT column — continuous vertical scrolling animation from TOP to BOTTOM */}
          <motion.div
            variants={columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex-1 min-w-0 h-full flex flex-col"
          >
            <MarqueeColumn images={leftImages} direction="down" />
          </motion.div>

          {/* CENTER column — centered header + 2 static images */}
          <motion.div
            variants={columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex-1 min-w-0 h-full flex flex-col justify-between"
          >
            {/* Centered Section Header */}
            <motion.div
              variants={headerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col items-center text-center flex-shrink-0"
            >
              {/* Small Title */}
              <span className="font-montez text-[#39CA5B] text-xl sm:text-3xl md:text-4xl lg:text-4xl font-normal leading-tight mb-0.5 sm:mb-1">
                Moments Worth Remembering
              </span>

              {/* Main Title */}
              <h2 className="font-roboto text-[#006993] text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight mb-1.5 sm:mb-2.5">
                Our Gallery
              </h2>

              {/* Decorative Underline */}
              <div className="w-16 sm:w-20 lg:w-24 h-1 sm:h-1.5 bg-[#39CA5B] rounded-full" />
            </motion.div>

            {/* Static Images (exactly 2 images matching the bottom alignment) */}
            <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5 flex-1 min-h-0 mt-3 sm:mt-4 lg:mt-5">
              {centerImages.map((img) => (
                <div
                  key={img.id}
                  className="relative w-full flex-1 min-h-0 rounded-2xl sm:rounded-3xl overflow-hidden"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 33vw, (max-width: 1024px) 30vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT column — continuous vertical scrolling animation from BOTTOM to TOP */}
          <motion.div
            variants={columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex-1 min-w-0 h-full flex flex-col"
          >
            <MarqueeColumn images={rightImages} direction="up" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
