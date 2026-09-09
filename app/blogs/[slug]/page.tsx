"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getBlogById, getBlogs, type Blog } from "@/api/blogs";
import Breadcrumb from "@/components/Breadcrumb";
import BlogDetailHero from "@/components/Blogs/BlogDetailHero";
import BlogArticle from "@/components/Blogs/BlogArticle";
import BlogSidebar from "@/components/Blogs/BlogSidebar";

import { useLanguage } from "@/context/LanguageContext";

export default function BlogDetailsPage() {
  const { t, language } = useLanguage();
  const params = useParams();
  const slug =
    typeof params?.slug === "string"
      ? params.slug
      : Array.isArray(params?.slug)
        ? params.slug[0]
        : "";

  const [blog, setBlog] = useState<Blog | null>(null);
  const [recentPosts, setRecentPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    if (!blog) {
      setLoading(true);
    }
    // slug may be the numeric id or a stringified id
    const id = Number(slug);
    if (!id) {
      setError(t("blogs.blogNotFound", "Blog not found"));
      setLoading(false);
      return;
    }

    Promise.all([
      getBlogById(id, language),
      getBlogs(1, 10, language),
    ])
      .then(([b, all]) => {
        if (!cancelled) {
          setBlog(b);
          setRecentPosts(all.filter((p) => p.id !== b.id).slice(0, 3));
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : t("blogs.failedToLoadBlog", "Failed to load blog"));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug, language, t]);

  if (loading && !blog) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-400 font-roboto">{t("blogs.loading", "Loading...")}</p>
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || t("blogs.blogNotFound", "Blog not found")}</p>
          <a href="/blogs" className="px-6 py-2 bg-[#006993] text-white rounded-lg hover:bg-[#004560] inline-block">
            {t("blogs.backToBlogs", "Back to Blogs")}
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white flex flex-col overflow-x-clip">

      {/* ── Hero Section ─────────────────────────────────────────── */}
      <BlogDetailHero blog={blog} />

      {/* ── Breadcrumb Navigation ─────────────────────────────────── */}
      <Breadcrumb
        items={[
          { label: t("nav.home", "Home"), href: "/" },
          { label: t("nav.blogs", "Blogs"), href: "/blogs" },
          { label: t("blogs.blogDetails", "Blog details") },
        ]}
      />

      {/* ── Main Content Area (2-Column Layout) ───────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14 w-full flex-1">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-14">

          {/* LEFT COLUMN: Article + Comments */}
          <div className="w-full lg:w-[68%] flex flex-col">
            <BlogArticle blog={blog} />
          </div>

          {/* RIGHT COLUMN: Sidebar */}
          <BlogSidebar blog={blog} recentPosts={recentPosts} />

        </div>
      </div>
    </main>
  );
}
