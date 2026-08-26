interface BlogSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BlogSearchBar({ value, onChange }: BlogSearchBarProps) {
  return (
    <div className="relative w-full max-w-4xl mb-6">
      <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
        <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-11 sm:pl-12 pr-4 py-3 sm:py-3.5 bg-white border border-gray-200 rounded-full font-roboto text-xs sm:text-sm text-[#030811] placeholder-gray-400 focus:outline-none focus:border-[#004560] shadow-xs"
      />
    </div>
  );
}
