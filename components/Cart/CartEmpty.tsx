import Link from "next/link";

interface CartEmptyProps {
  onReset: () => void;
}

export default function CartEmpty({ onReset }: CartEmptyProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl p-10 sm:p-16 text-center max-w-2xl mx-auto shadow-xs">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      </div>
      <h2 className="font-roboto font-bold text-slate-800 text-xl sm:text-2xl mb-2">
        Your Booking Cart is Empty
      </h2>
      <p className="font-roboto text-gray-500 text-sm max-w-md mx-auto mb-6">
        Looks like you haven&apos;t added any tours to your cart yet. Explore our unforgettable Egyptian adventures and start planning today!
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/trips"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-roboto font-medium text-sm transition-colors shadow-xs"
        >
          Explore Tours
        </Link>
        <button
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 text-slate-700 hover:bg-slate-50 font-roboto font-medium text-sm transition-colors cursor-pointer"
        >
          Reset Reference Tours
        </button>
      </div>
    </div>
  );
}
