import Image from "next/image";
import Link from "next/link";
import { DestinationItem } from "@/data/destinations";

interface DestinationCardProps {
  dest: DestinationItem;
}

export default function DestinationCard({ dest }: DestinationCardProps) {
  return (
    <Link
      href={dest.href}
      className="relative h-64 sm:h-72 md:h-80 rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group cursor-pointer"
    >
      {/* Background Destination Photo */}
      <Image
        src={dest.image}
        alt={dest.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Trip Count Pill Badge (Top Right) */}
      <div className="absolute top-4 right-4 z-10">
        <span className="bg-white/90 backdrop-blur-xs text-[#39CA5B] font-roboto font-semibold text-xs px-3.5 py-1.5 rounded-full shadow-xs">
          {dest.tripCount} Trips
        </span>
      </div>

      {/* Destination Name (Bottom Centered) */}
      <div className="absolute bottom-5 inset-x-0 text-center z-10 px-4">
        <h2 className="font-roboto font-bold text-white text-2xl sm:text-3xl drop-shadow-md">
          {dest.name}
        </h2>
      </div>
    </Link>
  );
}
