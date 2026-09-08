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
  const { t } = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    getBlogs(1, 100)
      .then(setBlogs)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load blogs"))
      .finally(() => setLoading(false));
  }, []);

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
          <span className="font-roboto text-sm text-[#030811] mr-1">Popular tags:</span>
          {POPULAR_TAGS.map((tag) => {
            const isActive = activeTag === tag;
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
                {tag}
              </button>
            );
          })}
        </div>

        {loading && (
          <div className="w-full py-16 text-center text-gray-400 font-roboto">Loading...</div>
        )}

        {!loading && error && (
          <div className="w-full py-16 text-center text-red-500 font-roboto text-sm">{error}</div>
        )}

        {!loading && !error && (
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
