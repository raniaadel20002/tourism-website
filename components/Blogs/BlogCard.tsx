"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { buildImageUrl } from "@/api/gallery";
import { Blog } from "@/api/blogs";

interface BlogCardProps {
  post: Blog;
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
  const imageUrl = post.imageUrl ? buildImageUrl(post.imageUrl) : null;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="flex flex-col"
    >
      <Link
        href={`/blogs/${post.id}`}
        className="w-full h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
      >
        {/* Card Image — no rounded corners, full-bleed */}
        <div className="h-56 sm:h-60 w-full overflow-hidden bg-gray-100 flex-shrink-0">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5 flex flex-col flex-1 justify-between">
          {/* Title */}
          <h2 className="font-roboto font-bold text-base sm:text-lg text-[#004560] leading-snug line-clamp-2 group-hover:text-[#006993] transition-colors mb-4">
            {post.title}
          </h2>

          {/* Centered Read More Button */}
          <div className="flex justify-center pt-1">
            <span className="font-roboto font-medium text-sm text-[#004560] border border-[#004560] px-8 py-2 rounded-full group-hover:bg-[#004560] group-hover:text-white transition-colors duration-200 inline-block">
              {t("blogs.readMore", "Read More")}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
