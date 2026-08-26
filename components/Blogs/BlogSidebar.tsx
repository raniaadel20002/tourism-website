import Image from "next/image";
import Link from "next/link";
import { BlogItem } from "@/data/blogs";

interface BlogSidebarProps {
  toc: BlogItem["toc"];
  activeToc: string;
  onTocClick: (id: string) => void;
  recentPosts: BlogItem[];
}

export default function BlogSidebar({ toc, activeToc, onTocClick, recentPosts }: BlogSidebarProps) {
  return (
    <aside className="w-full lg:w-[28%] flex flex-col gap-8 lg:sticky lg:top-24">

      {/* 1. Table of Contents Stepper Card */}
      <div className="bg-[#F3F8FB] rounded-2xl p-6 sm:p-7 border border-blue-50/60 shadow-xs">
        <div className="flex flex-col relative">
          {toc.map((item, idx) => {
            const isActive = activeToc === item.id;
            const isLast = idx === toc.length - 1;

            return (
              <div key={item.id} className="relative flex items-start group">

                {/* Vertical Connecting Line */}
                {!isLast && (
                  <div className="absolute left-[8px] top-[18px] bottom-[-6px] w-[1.5px] bg-[#D2E4EE]" />
                )}

                {/* Step Indicator Dot */}
                <button
                  type="button"
                  onClick={() => onTocClick(item.id)}
                  className="flex items-center gap-3.5 pb-6 text-left w-full cursor-pointer z-10"
                >
                  {/* Dot Container */}
                  <div className="flex-shrink-0 w-[18px] h-[18px] flex items-center justify-center rounded-full bg-[#F3F8FB]">
                    {isActive ? (
                      <div className="w-[18px] h-[18px] rounded-full border-2 border-[#006993] flex items-center justify-center bg-white">
                        <div className="w-2 h-2 rounded-full bg-[#006993]" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-gray-300 bg-white group-hover:border-[#006993] transition-colors" />
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`font-roboto text-xs sm:text-sm transition-colors ${
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

      {/* 2. Recent Posts List */}
      <div className="flex flex-col">
        <h3 className="font-roboto font-bold text-[#000C09] text-base sm:text-lg mb-4">
          Recent Posts
        </h3>

        <div className="flex flex-col gap-4">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blogs/${post.slug}`}
              className="flex items-center gap-3.5 group p-1.5 rounded-xl hover:bg-gray-50 transition-colors"
            >
              {/* Thumbnail */}
              <div className="relative w-16 sm:w-20 h-16 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center">
                <h4 className="font-roboto font-bold text-xs sm:text-sm text-[#000C09] leading-snug group-hover:text-[#006993] transition-colors line-clamp-2">
                  {post.title}
                </h4>

                <div className="flex items-center gap-1.5 mt-1 text-gray-400">
                  {/* Chat Icon */}
                  <svg className="w-3.5 h-3.5 text-[#006993]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                  </svg>
                  <span className="font-roboto text-[11px] sm:text-xs">
                    {post.commentsCount} Comments
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </aside>
  );
}
