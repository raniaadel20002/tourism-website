"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { buildImageUrl } from "@/api/gallery";
import { Blog } from "@/api/blogs";

interface BlogSidebarProps {
  blog: Blog;
  recentPosts: Blog[];
}

export default function BlogSidebar({ blog, recentPosts }: BlogSidebarProps) {
  const { t } = useLanguage();

  // Build TOC from sorted sections
  const sortedSections = [...blog.blogSections].sort(
    (a, b) => a.sectionNumber - b.sectionNumber
  );
  const toc = [
    { id: "introduction", label: t("blogs.introduction", "Introduction") },
    ...sortedSections.map((s) => ({
      id: `section-${s.id}`,
      label: s.title || `Section ${s.sectionNumber}`,
    })),
  ];

  const [activeToc, setActiveToc] = useState("introduction");

  const scrollToSection = (id: string) => {
    setActiveToc(id);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
      className="w-full lg:w-[28%] flex flex-col gap-8 lg:sticky lg:top-24 self-start"
    >

      {/* Table of Contents */}
      {toc.length > 0 && (
        <div className="bg-[#F3F8FB] rounded-2xl p-6 border border-blue-50/60">
          <div className="flex flex-col relative">
            {toc.map((item, idx) => {
              const isActive = activeToc === item.id;
              const isLast = idx === toc.length - 1;
              return (
                <div key={item.id} className="relative flex items-start group">
                  {/* Vertical connector line */}
                  {!isLast && (
                    <div className="absolute left-[9px] top-[20px] bottom-[-4px] w-[1.5px] bg-[#C8DDE9]" />
                  )}
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center gap-3.5 pb-5 text-left w-full cursor-pointer z-10"
                  >
                    {/* Dot */}
                    <div className="flex-shrink-0 mt-0.5">
                      {isActive ? (
                        <div className="w-[20px] h-[20px] rounded-full border-2 border-[#006993] flex items-center justify-center bg-white">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#006993]" />
                        </div>
                      ) : (
                        <div className="w-[20px] h-[20px] rounded-full border border-gray-300 bg-white group-hover:border-[#006993] transition-colors" />
                      )}
                    </div>
                    <span
                      className={`font-roboto text-sm transition-colors ${
                        isActive
                          ? "font-semibold text-[#006993]"
                          : "font-normal text-gray-600 group-hover:text-[#006993]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div className="flex flex-col">
          <h3 className="font-roboto font-bold text-[#000C09] text-base sm:text-lg mb-4">
            {t("blogs.recentPosts", "Recent Posts")}
          </h3>

          <div className="flex flex-col gap-3">
            {recentPosts.map((post) => {
              const postImage = post.imageUrl ? buildImageUrl(post.imageUrl) : null;
              return (
                <Link
                  key={post.id}
                  href={`/blogs/${post.id}`}
                  className="flex items-center gap-3 group p-1.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-[70px] h-[60px] rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                    {postImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={postImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Title + icon */}
                  <div className="flex flex-col justify-center min-w-0">
                    <h4 className="font-roboto font-bold text-xs sm:text-sm text-[#000C09] leading-snug group-hover:text-[#006993] transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-1 mt-1 text-gray-400">
                      <svg className="w-3.5 h-3.5 text-[#006993]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                      </svg>
                      <span className="font-roboto text-[11px]">
                        {post.blogSections.length} {t("blogs.sections", "Sections")}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

    </motion.aside>
  );
}
