"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface TripDetailGalleryProps {
  mainImage: string;
  title: string;
  galleryImages: string[];
}

export default function TripDetailGallery({
  mainImage,
  title,
  galleryImages,
}: TripDetailGalleryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col lg:flex-row items-stretch gap-4 sm:gap-6 w-full"
    >
      {/* Main Large Image (Left) */}
      <div className="w-full lg:w-[60%] relative h-[280px] sm:h-[380px] md:h-[460px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
        <Image
          src={mainImage}
          alt={title}
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* 2×2 Grid Thumbnails (Right) */}
      <div className="w-full lg:w-[40%] grid grid-cols-2 gap-3 sm:gap-4 h-[280px] sm:h-[380px] md:h-[460px] lg:h-[500px]">
        {galleryImages.slice(0, 4).map((imgSrc, idx) => (
          <div
            key={idx}
            className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs bg-gray-100 group"
          >
            <Image
              src={imgSrc}
              alt={`${title} photo ${idx + 1}`}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
