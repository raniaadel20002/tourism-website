"use client";

import { useState } from "react";
import { galleryImages, GalleryImage } from "@/data/gallery";
import GalleryCard from "./GalleryCard";

interface GalleryGridProps {
  onExpand: (image: GalleryImage) => void;
}

export default function GalleryGrid({ onExpand }: GalleryGridProps) {
  const [displayedCount, setDisplayedCount] = useState(8);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full flex-1 flex flex-col items-center">

      {/* Gallery Items Grid */}
      <div className="w-full flex flex-wrap gap-6 sm:gap-8 justify-start">
        {galleryImages.slice(0, displayedCount).map((image) => (
          <GalleryCard key={image.id} image={image} onExpand={onExpand} />
        ))}
      </div>

      {/* Centered See More Button */}
      <div className="w-full flex justify-center mt-12 sm:mt-16 mb-4">
        <button
          type="button"
          onClick={() =>
            setDisplayedCount((prev) =>
              prev >= galleryImages.length ? 8 : prev + 4
            )
          }
          className="w-full max-w-md sm:max-w-lg py-3 sm:py-3.5 px-8 rounded-full border border-[#004560] text-[#004560] hover:bg-[#004560] hover:text-white font-roboto font-semibold text-sm sm:text-base text-center transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
        >
          See More
        </button>
      </div>

    </div>
  );
}
