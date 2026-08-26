import Image from "next/image";
import Link from "next/link";
import { BlogItem } from "@/data/blogs";

interface BlogCardProps {
  post: BlogItem;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] flex flex-col bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden border border-gray-100/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
    >
      {/* Card Image */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-t-[24px] sm:rounded-t-[28px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Date */}
          <span className="font-roboto font-normal text-xs sm:text-sm text-[#5B6472] block mb-2">
            {post.date}
          </span>

          {/* Title */}
          <h2 className="font-roboto font-bold text-lg sm:text-xl lg:text-[22px] text-[#004560] leading-snug line-clamp-2 group-hover:text-[#006993] transition-colors mb-6">
            {post.title}
          </h2>
        </div>

        {/* Outlined Read More Button aligned to the right */}
        <div className="flex justify-end pt-2">
          <span className="font-roboto font-semibold text-xs sm:text-sm text-[#004560] border border-[#004560] px-6 py-2 rounded-full group-hover:bg-[#004560] group-hover:text-white transition-colors duration-200 inline-block">
            Read More
          </span>
        </div>
      </div>
    </Link>
  );
}
