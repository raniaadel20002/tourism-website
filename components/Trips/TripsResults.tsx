import { Trip } from "@/data/trips";
import TripCard from "./TripCard";

interface TripsResultsProps {
  trips: Trip[];
  tripCount: number;
  searchQuery: string;
  onSearchChange: (v: string) => void;
  sortBy: string;
  onSortChange: (v: string) => void;
  filterMobileOpen: boolean;
  onToggleMobileFilter: () => void;
  onClearFilters: () => void;
}

export default function TripsResults({
  trips,
  tripCount,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  filterMobileOpen,
  onToggleMobileFilter,
  onClearFilters,
}: TripsResultsProps) {
  return (
    <div className="flex-1 min-w-0 w-full flex flex-col">

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6 flex justify-between items-center">
        <span className="font-roboto text-sm font-medium text-[#030811]">
          {tripCount} Trips Found
        </span>
        <button
          type="button"
          onClick={onToggleMobileFilter}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#F4F8FA] border border-gray-200 rounded-full font-roboto text-xs font-semibold text-[#004560]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {filterMobileOpen ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Top Bar: Count + Search + Sort */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 sm:mb-8 pb-2">

        {/* Counter (Desktop only) */}
        <div className="hidden lg:block font-roboto font-normal text-sm sm:text-base text-[#030811]">
          {tripCount} Trips Found
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-80 md:w-96">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-full font-roboto text-xs sm:text-sm text-[#030811] placeholder-gray-400 focus:outline-none focus:border-[#004560]"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <span className="font-roboto text-xs sm:text-sm text-[#030811] whitespace-nowrap">Sort by</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-transparent font-roboto text-xs sm:text-sm text-[#5B6472] pr-6 py-1 border-b border-gray-300 focus:outline-none focus:border-[#004560] cursor-pointer"
            >
              <option value="Latest">Latest</option>
              <option value="PriceLowHigh">Price: Low to High</option>
              <option value="PriceHighLow">Price: High to Low</option>
              <option value="Rating">Top Rated</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* Trip Cards or Empty State */}
      {trips.length === 0 ? (
        <div className="w-full py-16 flex flex-col items-center justify-center text-center bg-[#F4F8FA] rounded-2xl p-8">
          <p className="font-roboto text-base sm:text-lg text-[#004560] font-medium mb-2">
            No trips matched your criteria
          </p>
          <p className="font-roboto text-xs sm:text-sm text-[#5B6472] mb-4">
            Try adjusting your filters or search query to find available tours.
          </p>
          <button
            type="button"
            onClick={onClearFilters}
            className="px-6 py-2 bg-[#004560] text-white rounded-full font-roboto text-xs sm:text-sm font-semibold hover:bg-[#003348] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}

    </div>
  );
}
