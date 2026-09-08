"use client";

import { motion } from "framer-motion";
import { buildImageUrl } from "@/api/gallery";
import { Blog } from "@/api/blogs";

interface BlogArticleProps {
  blog: Blog;
}

export default function BlogArticle({ blog }: BlogArticleProps) {
  const imageUrl = blog.imageUrl ? buildImageUrl(blog.imageUrl) : null;

  // Sections sorted by sectionNumber
  const sortedSections = [...blog.blogSections].sort(
    (a, b) => a.sectionNumber - b.sectionNumber
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full flex flex-col"
    >
      {/* 1. Main Image */}
      {imageUrl && (
        <div className="w-full h-[260px] sm:h-[340px] md:h-[400px] rounded-2xl overflow-hidden mb-6 bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}

      {/* 2. Title */}
      <div id="introduction" className="mb-4 scroll-mt-24">
        <h2 className="font-roboto font-bold text-[#000C09] text-xl sm:text-2xl leading-snug">
          {blog.title}
        </h2>
        {/* Blue underline accent under first line */}
        <div className="mt-2 w-16 h-[3px] bg-[#004560] rounded-full" />
      </div>

      {/* 3. Main content */}
      <div className="space-y-6 text-[#484848] font-roboto text-sm sm:text-[15px] leading-relaxed">
        <p>{blog.content}</p>

        {/* Blog sections ordered by sectionNumber */}
        {sortedSections.map((sec) => {
          const secImageUrl = sec.imageUrl ? buildImageUrl(sec.imageUrl) : null;
          return (
            <div key={sec.id} id={`section-${sec.id}`} className="pt-2 scroll-mt-24">
              {sec.title && (
                <h3 className="font-roboto font-bold text-[#000C09] text-lg sm:text-xl mb-3">
                  {sec.title}
                </h3>
              )}
              {secImageUrl && (
                <div className="w-full h-48 sm:h-64 rounded-xl overflow-hidden mb-3 bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={secImageUrl}
                    alt={sec.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <p>{sec.content}</p>
            </div>
          );
        })}
      </div>
    </motion.article>
  );
}
