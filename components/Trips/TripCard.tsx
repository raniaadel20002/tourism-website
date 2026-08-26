import Image from "next/image";
import Link from "next/link";
import { Trip } from "@/data/trips";

interface TripCardProps {
  trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
  return (
    <Link
      href={`/trips/${trip.slug}`}
      className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex flex-col bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-gray-100 cursor-pointer"
    >
      {/* Card Image */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden">
        <Image
          src={trip.image}
          alt={trip.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div className="flex flex-col gap-1">
          {/* Category */}
          <span className="font-roboto text-xs text-[#5B6472] font-normal">
            {trip.category}
          </span>

          {/* Title */}
          <h3 className="font-roboto font-semibold text-base sm:text-[17px] text-[#004560] leading-snug line-clamp-1 group-hover:text-[#006993] transition-colors">
            {trip.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-[#5B6472] text-xs mt-0.5">
            <svg className="w-3.5 h-3.5 text-[#5B6472] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-roboto">{trip.location}</span>
          </div>
        </div>

        {/* Rating & Price Row */}
        <div className="flex items-center justify-between pt-1">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-roboto text-xs text-[#030811] font-normal">
              {trip.rating} ({trip.reviewsCount} Review)
            </span>
          </div>

          {/* Price */}
          <div className="font-roboto font-bold text-sm sm:text-base text-[#39CA5B]">
            {trip.priceFormatted}
          </div>
        </div>

        {/* Book Now Button */}
        <span className="w-full mt-1 bg-[#004560] group-hover:bg-[#003348] text-white font-roboto font-semibold text-xs sm:text-sm py-2.5 rounded-full text-center shadow-sm group-hover:shadow-md transition-all duration-200 block">
          Book Now
        </span>
      </div>
    </Link>
  );
}
