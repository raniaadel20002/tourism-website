import { BlogItem } from "@/data/blogs";
import BlogCard from "./BlogCard";

interface BlogsGridProps {
  posts: BlogItem[];
  visibleCount: number;
  onResetFilters: () => void;
}

export default function BlogsGrid({ posts, visibleCount, onResetFilters }: BlogsGridProps) {
  if (posts.length === 0) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center text-center bg-[#F4F8FA] rounded-2xl p-8 max-w-2xl">
        <p className="font-roboto text-base sm:text-lg text-[#004560] font-medium mb-2">
          No articles found
        </p>
        <p className="font-roboto text-xs sm:text-sm text-[#5B6472] mb-4">
          Try searching with another keyword or selecting a different tag.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="px-6 py-2 bg-[#004560] text-white rounded-full font-roboto text-xs sm:text-sm font-semibold hover:bg-[#003348] transition-colors cursor-pointer"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-wrap gap-6 sm:gap-8 justify-start">
      {posts.slice(0, visibleCount).map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
