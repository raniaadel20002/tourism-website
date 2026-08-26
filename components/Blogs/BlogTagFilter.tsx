const popularTags = ["All", "Sea", "Safari", "History"] as const;

interface BlogTagFilterProps {
  activeTag: string;
  onTagChange: (tag: string) => void;
}

export default function BlogTagFilter({ activeTag, onTagChange }: BlogTagFilterProps) {
  return (
    <div className="w-full max-w-4xl flex flex-wrap items-center gap-2.5 sm:gap-3 mb-10 sm:mb-12">
      <span className="font-roboto font-normal text-xs sm:text-sm text-[#030811] mr-1">
        Popular tags:
      </span>
      {popularTags.map((tag) => {
        const isActive = activeTag === tag;
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onTagChange(tag)}
            className={`px-5 sm:px-6 py-1.5 sm:py-2 rounded-full font-roboto font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-[#003B57] text-white shadow-xs font-semibold"
                : "bg-[#E2E8F0] text-[#5B6472] hover:bg-gray-300"
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
