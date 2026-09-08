"use client";

import { motion } from "framer-motion";
import { Blog } from "@/api/blogs";
import BlogCard from "./BlogCard";
import { useLanguage } from "@/context/LanguageContext";

interface BlogsGridProps {
  posts: Blog[];
  visibleCount: number;
  onResetFilters: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function BlogsGrid({ posts, visibleCount, onResetFilters }: BlogsGridProps) {
  const { t } = useLanguage();

  if (posts.length === 0) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center text-center bg-[#F4F8FA] rounded-2xl p-8 max-w-2xl mx-auto">
        <p className="font-roboto text-base text-[#004560] font-medium mb-2">
          {t("blogs.noArticles", "No articles found")}
        </p>
        <p className="font-roboto text-sm text-[#5B6472] mb-4">
          {t("blogs.noArticlesDesc", "Try searching with another keyword.")}
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="px-6 py-2 bg-[#004560] text-white rounded-full font-roboto text-sm font-semibold hover:bg-[#003348] transition-colors cursor-pointer"
        >
          {t("blogs.resetFilters", "Reset Filters")}
        </button>
      </div>
    );
  }

  return (
    <motion.div
      key={posts.slice(0, visibleCount).map((p) => p.id).join("-")}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {posts.slice(0, visibleCount).map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </motion.div>
  );
}
