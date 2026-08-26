"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

interface BlogPost {
  id: string;
  date: string;
  title: string;
  image: string;
  href: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    date: "10Jun",
    title: "Top Tours in Hurghada 2026",
    image: "/images/home/Blogs/406065c289068fca584e70b62f59ca7257238059.jpg",
    href: "/blogs/top-tours-hurghada-2026",
  },
  {
    id: "2",
    date: "10Jun",
    title: "The valley of the Kings",
    image: "/images/home/Blogs/afbce762e899ad363b746ae91fc0c11c35ac147d.jpg",
    href: "/blogs/valley-of-the-kings",
  },
  {
    id: "3",
    date: "10Jun",
    title: "How you choose Next Tour?",
    image: "/images/home/Blogs/36b1bda7b54e708ae1339161a16f910b0db436ae.jpg",
    href: "/blogs/how-to-choose-your-next-tour",
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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom * 0.15,
      ease: "easeOut",
    },
  }),
};

export default function BlogSection() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
      {/* ── Background Decorative SVG (strictly contained within this section only) ── */}
      <div
        className="absolute left-110 w-[280px] sm:w-[380px] md:w-[60px] lg:w-[140px] pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <Image
          src="/images/home/Blogs/Vector.svg"
          alt=""
          width={264}
          height={188}
          className="w-full h-auto object-contain object-left-top"
          priority
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header Row ── */}
        <div className="relative flex flex-col items-center text-center mb-10 sm:mb-14">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            {/* Small Title */}
            <span className="font-montez text-[#69DD84] text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight mb-1 tracking-wide">
              Discover travel guides
            </span>

            {/* Main Title */}
            <h2 className="font-roboto text-[#006993] text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight mb-3">
              Our Blogs
            </h2>

            {/* Decorative Underline */}
            <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-[#69DD84] rounded-full" />
          </motion.div>

          {/* More Articals Button */}
          <div className="mt-6 lg:mt-0 lg:absolute lg:right-0 lg:bottom-1">
            <Link
              href="/blogs"
              className="inline-block font-roboto font-semibold text-sm text-[#004560] border border-[#004560] px-6 py-2 rounded-full hover:bg-[#004560] hover:text-white transition-colors duration-200"
            >
              More Articals
            </Link>
          </div>
        </div>

        {/* ── Blog Cards (Flexbox: Fully clickable cards) ── */}
        <div className="flex flex-wrap lg:flex-nowrap justify-center gap-6 w-full">
          {blogPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="w-full sm:w-[calc(50%-12px)] lg:w-1/3 lg:flex-1 min-w-0"
            >
              <Link
                href={post.href}
                className="group w-full h-full bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100/90 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
              >
                {/* Card Image */}
                <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="font-roboto text-[#979BA7] text-xs sm:text-sm block mb-1.5">
                      {post.date}
                    </span>
                    <h3 className="font-roboto text-[#004560] font-bold text-lg sm:text-xl lg:text-[22px] leading-snug group-hover:text-[#006993] transition-colors">
                      {post.title}
                    </h3>
                  </div>

                  <div className="flex justify-end mt-4 sm:mt-6">
                    <span className="font-roboto font-semibold text-xs sm:text-sm text-[#004560] border border-[#004560] px-5 py-1.5 sm:px-6 sm:py-2 rounded-full group-hover:bg-[#004560] group-hover:text-white transition-colors duration-200 inline-block">
                      Read More
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
