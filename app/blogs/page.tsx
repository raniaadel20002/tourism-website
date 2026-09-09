"use client";

import { useState, useEffect, useMemo } from "react";
import { getBlogs, type Blog } from "@/api/blogs";
import BlogsHero from "@/components/Blogs/BlogsHero";
import Breadcrumb from "@/components/Breadcrumb";
import BlogSearchBar from "@/components/Blogs/BlogSearchBar";
import BlogsGrid from "@/components/Blogs/BlogsGrid";

import { useLanguage } from "@/context/LanguageContext";

const POPULAR_TAGS = ["All", "Sea", "Safari", "History"] as const;

export default function BlogsPage() {
  const { t, language } = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    let cancelled = false;
    if (blogs.length === 0) {
      setLoading(true);
    }
    getBlogs(1, 100, language)
      .then((data) => {
        if (!cancelled) setBlogs(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : t("blogs.failedToLoad", "Failed to load blogs"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [language, t]);

  const filteredPosts = useMemo(() => {
    // All API blogs belong to "Sea". Other tags show empty state.
    if (activeTag !== "All" && activeTag !== "Sea") return [];
    return blogs.filter((b) => {
      if (searchQuery.trim() && !b.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [blogs, searchQuery, activeTag]);

  const handleSeeMore = () => setVisibleCount((prev) => prev + 3);
  const handleResetFilters = () => { setSearchQuery(""); setActiveTag("All"); };

  return (
    <main className="min-h-screen bg-white flex flex-col">

      <BlogsHero />

      <Breadcrumb items={[{ label: t("nav.home", "Home"), href: "/" }, { label: t("nav.blogs", "Blogs") }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col">

        {/* Search Bar */}
        <BlogSearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* Popular Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="font-roboto text-sm text-[#030811] mr-1">{t("blogs.popularTags", "Popular tags:")}</span>
          {POPULAR_TAGS.map((tag) => {
            const isActive = activeTag === tag;
            const tagLabel = tag === "All" ? t("blogs.allTags", "All") : t(`blogs.tag${tag}`, tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`px-5 py-1.5 rounded-full font-roboto text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#003B57] text-white"
                    : "bg-transparent border border-gray-300 text-gray-600 hover:border-[#003B57]"
                }`}
              >
                {tagLabel}
              </button>
            );
          })}
        </div>

        {loading && blogs.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={`blog-card-skel-${idx}`}
                className="w-full flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm animate-pulse"
              >
                <div className="h-56 sm:h-60 w-full bg-gray-200 flex-shrink-0" />
                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div className="space-y-2">
                    <div className="h-4 w-4/5 bg-gray-200 rounded" />
                    <div className="h-4 w-3/5 bg-gray-200 rounded" />
                  </div>
                  <div className="w-full h-9 bg-gray-100 rounded-full mt-2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && blogs.length === 0 && (
          <div className="w-full py-16 text-center text-red-500 font-roboto text-sm">{error}</div>
        )}

        {(!loading || blogs.length > 0) && (
          <BlogsGrid
            posts={filteredPosts}
            visibleCount={visibleCount}
            onResetFilters={handleResetFilters}
          />
        )}

        {/* See More Button */}
        {!loading && !error && filteredPosts.length > visibleCount && (
          <div className="w-full flex justify-center mt-10 mb-4">
            <button
              type="button"
              onClick={handleSeeMore}
              className="w-full max-w-sm py-3 px-8 rounded-full border border-[#004560] text-[#004560] hover:bg-[#004560] hover:text-white font-roboto font-medium text-sm text-center transition-all duration-300 cursor-pointer"
            >
              {t("blogs.seeMore", "See More")}
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
