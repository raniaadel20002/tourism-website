"use client";

import { useState, useMemo } from "react";
import { allBlogsData } from "@/data/blogs";
import BlogsHero from "@/components/Blogs/BlogsHero";
import Breadcrumb from "@/components/Breadcrumb";
import BlogSearchBar from "@/components/Blogs/BlogSearchBar";
import BlogTagFilter from "@/components/Blogs/BlogTagFilter";
import BlogsGrid from "@/components/Blogs/BlogsGrid";

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredPosts = useMemo(() => {
    return allBlogsData.filter((post) => {
      if (activeTag !== "All" && post.tag !== activeTag) return false;
      if (
        searchQuery.trim() &&
        !post.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [searchQuery, activeTag]);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveTag("All");
  };

  return (
    <main className="min-h-screen bg-white flex flex-col">

      {/* ── Hero Section ─────────────────────────────────────────── */}
      <BlogsHero />

      {/* ── Breadcrumb ───────────────────────────────────────────── */}
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blogs" }]} />

      {/* ── Main Content Container ──────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1 flex flex-col items-center">

        {/* Search Bar */}
        <BlogSearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* Popular Tags */}
        <BlogTagFilter activeTag={activeTag} onTagChange={setActiveTag} />

        {/* Blog Cards Grid */}
        <BlogsGrid
          posts={filteredPosts}
          visibleCount={visibleCount}
          onResetFilters={handleResetFilters}
        />

        {/* ── Centered See More Button ──────────────────────────── */}
        {filteredPosts.length > 0 && (
          <div className="w-full flex justify-center mt-12 sm:mt-16 mb-4">
            <button
              type="button"
              onClick={handleSeeMore}
              className="w-full max-w-md sm:max-w-lg py-3 sm:py-3.5 px-8 rounded-full border border-[#004560] text-[#004560] hover:bg-[#004560] hover:text-white font-roboto font-semibold text-sm sm:text-base text-center transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
            >
              See More
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
