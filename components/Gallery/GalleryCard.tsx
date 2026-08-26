import Image from "next/image";
import { GalleryImage } from "@/data/gallery";

interface GalleryCardProps {
  image: GalleryImage;
  onExpand: (image: GalleryImage) => void;
}

export default function GalleryCard({ image, onExpand }: GalleryCardProps) {
  return (
    <div className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] flex flex-col bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group relative border border-gray-100">
      {/* Card Image */}
      <div className="relative h-72 sm:h-80 lg:h-[340px] w-full overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Expand / Fullscreen Button */}
      <button
        type="button"
        onClick={() => onExpand(image)}
        aria-label={`Expand ${image.alt}`}
        className="absolute top-4 right-4 bg-white/90 hover:bg-white text-[#004560] p-2 sm:p-2.5 rounded-xl shadow-md transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer z-10 backdrop-blur-xs"
      >
        {/* 4 outward pointing arrows (fullscreen icon) */}
        <svg
          className="w-4 sm:w-5 h-4 sm:h-5 text-[#004560]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
          />
        </svg>
      </button>
    </div>
  );
}
