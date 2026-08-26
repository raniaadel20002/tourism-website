"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getBlogPostBySlug, allBlogsData } from "@/data/blogs";
import Breadcrumb from "@/components/Breadcrumb";
import BlogDetailHero from "@/components/Blogs/BlogDetailHero";
import BlogArticle from "@/components/Blogs/BlogArticle";
import BlogComments from "@/components/Blogs/BlogComments";
import BlogSidebar from "@/components/Blogs/BlogSidebar";

export default function BlogDetailsPage() {
  const params = useParams();
  const slug =
    typeof params?.slug === "string"
      ? params.slug
      : Array.isArray(params?.slug)
      ? params.slug[0]
      : "";
  const blog = getBlogPostBySlug(slug);

  const [activeToc, setActiveToc] = useState("introduction");

  // Recent posts excluding current blog
  const recentPostsList = allBlogsData
    .filter((b) => b.slug !== blog.slug)
    .slice(0, 3);

  const scrollToSection = (id: string) => {
    setActiveToc(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col overflow-x-clip">

      {/* ── Hero Section ─────────────────────────────────────────── */}
      <BlogDetailHero blog={blog} />

      {/* ── Breadcrumb Navigation ─────────────────────────────────── */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blogs" },
          { label: "Blog details" },
        ]}
      />

      {/* ── Main Content Area (2-Column Layout) ───────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14 w-full flex-1">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-14">

          {/* LEFT COLUMN: Article + Comments */}
          <div className="w-full lg:w-[68%] flex flex-col">
            <BlogArticle blog={blog} />
            <BlogComments initialComments={blog.comments} />
          </div>

          {/* RIGHT COLUMN: Sidebar (TOC + Recent Posts) */}
          <BlogSidebar
            toc={blog.toc}
            activeToc={activeToc}
            onTocClick={scrollToSection}
            recentPosts={recentPostsList}
          />

        </div>
      </div>
    </main>
  );
}
