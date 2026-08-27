"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { BlogItem } from "@/data/blogs";

interface BlogCardProps {
  post: BlogItem;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function BlogCard({ post }: BlogCardProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] flex flex-col"
    >
      <Link
        href={`/blogs/${post.slug}`}
        className="w-full h-full flex flex-col bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden border border-gray-100/90 shadow-sm hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
      >
        {/* Card Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-t-[24px] sm:rounded-t-[28px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
          <div>
            {/* Date */}
            <span className="font-roboto font-normal text-xs sm:text-sm text-[#5B6472] block mb-2">
              {post.date}
            </span>

            {/* Title */}
            <h2 className="font-roboto font-bold text-lg sm:text-xl lg:text-[22px] text-[#004560] leading-snug line-clamp-2 group-hover:text-[#006993] transition-colors mb-6">
              {post.title}
            </h2>
          </div>

          {/* Outlined Read More Button aligned to the right */}
          <div className="flex justify-end pt-2">
            <span className="font-roboto font-semibold text-xs sm:text-sm text-[#004560] border border-[#004560] px-6 py-2 rounded-full group-hover:bg-[#004560] group-hover:text-white transition-colors duration-200 inline-block">
              {t("blogs.readMore", "Read More")}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
