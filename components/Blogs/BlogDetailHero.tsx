"use client";

import { motion } from "framer-motion";
import { buildImageUrl } from "@/api/gallery";
import { Blog } from "@/api/blogs";

interface BlogDetailHeroProps {
  blog: Blog;
}

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export default function BlogDetailHero({ blog }: BlogDetailHeroProps) {
  const imageUrl = blog.imageUrl ? buildImageUrl(blog.imageUrl) : null;

  return (
    <section className="relative w-full h-[220px] sm:h-[260px] md:h-[280px] pt-16 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 select-none bg-[#004560]">
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover object-center"
          />
        )}
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
          {blog.title}
        </h1>
      </motion.div>
    </section>
  );
}
