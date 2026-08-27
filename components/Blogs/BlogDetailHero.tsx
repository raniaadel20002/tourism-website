"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { BlogItem } from "@/data/blogs";

interface BlogDetailHeroProps {
  blog: BlogItem;
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function BlogDetailHero({ blog }: BlogDetailHeroProps) {
  return (
    <section className="relative w-full h-[280px] sm:h-[340px] md:h-[380px] lg:h-[420px] pt-16 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src={blog.heroImage || "/images/home/whereBegins/Frame 1171276613 (1).png"}
          alt={blog.title}
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark Overlay for optimal readability */}
        <div className="absolute inset-0 bg-black/45 backdrop-brightness-90" />
      </div>

      {/* Centered Blog Hero Title */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h1 className="font-roboto font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-[46px] leading-tight tracking-tight drop-shadow-md">
          {blog.heroTitle || blog.title}
        </h1>
      </motion.div>
    </section>
  );
}
