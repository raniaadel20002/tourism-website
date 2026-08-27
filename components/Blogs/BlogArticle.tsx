"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BlogItem } from "@/data/blogs";

interface BlogArticleProps {
  blog: BlogItem;
}

export default function BlogArticle({ blog }: BlogArticleProps) {
  // Splitting first word for decorative underline
  const titleWords = blog.title.split(" ");
  const firstWord = titleWords[0];
  const remainingTitle = titleWords.slice(1).join(" ");

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full lg:w-[68%] flex flex-col"
    >

      {/* 1. Featured Article Main Image */}
      <div className="relative w-full h-[280px] sm:h-[380px] md:h-[460px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm mb-4">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* 2. Metadata Bar (Author, Tag, Date) */}
      <div className="flex items-center justify-between py-2 mb-4 border-b border-gray-100/60 text-xs sm:text-sm text-gray-500 font-roboto">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Admin Author */}
          <div className="flex items-center gap-1.5 text-[#006993]">
            <svg className="w-4 h-4 text-[#006993]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-gray-600 font-normal">{blog.author}</span>
          </div>

          {/* Category Tag */}
          <div className="flex items-center gap-1.5 text-[#006993]">
            <svg className="w-4 h-4 text-[#006993]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span className="text-gray-600 font-normal">{blog.tag}</span>
          </div>
        </div>

        {/* Publication Date */}
        <span className="text-gray-400 text-xs sm:text-sm">{blog.date}</span>
      </div>

      {/* 3. Section Title with Underline */}
      <div id="introduction" className="pt-2 mb-5 scroll-mt-24">
        <h2 className="font-roboto font-bold text-[#000C09] text-xl sm:text-2xl md:text-[26px] leading-snug">
          <span className="border-b-[3px] border-[#004560] pb-1 mr-1.5">{firstWord}</span>
          {remainingTitle}
        </h2>
      </div>

      {/* 4. Article Paragraphs & Dynamic Sections */}
      <div className="space-y-6 text-[#484848] font-roboto text-sm sm:text-[15px] leading-relaxed">
        {/* Introduction Text */}
        <p>{blog.intro}</p>

        {/* Dynamic Subsections */}
        {blog.sections.map((sec) => (
          <div key={sec.id} id={sec.id} className="pt-4 scroll-mt-24">
            <h3 className="font-roboto font-bold text-[#000C09] text-lg sm:text-xl mb-3">
              {sec.heading}
            </h3>
            <p>{sec.content}</p>
          </div>
        ))}
      </div>

    </motion.article>
  );
}
