"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GalleryImage } from "@/modules/gallery.model";
import { getAllGalleryImages, buildImageUrl } from "@/api/gallery";
import GalleryCard from "./GalleryCard";
import { useLanguage } from "@/context/LanguageContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

interface GalleryGridProps {
  onExpand: (image: GalleryImage, images: GalleryImage[]) => void;
}

export default function GalleryGrid({ onExpand }: GalleryGridProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayedCount, setDisplayedCount] = useState(8);
  const { t } = useLanguage();

  useEffect(() => {
    let cancelled = false;

    async function fetchImages() {
      try {
        setLoading(true);
        setError(null);

        const apiImages = await getAllGalleryImages();

        if (!cancelled) {
          const mapped: GalleryImage[] = apiImages.map((img) => ({
            id: String(img.id),
            src: buildImageUrl(img.imageUrl),
            alt: `${t("gallery.image", "Gallery image")} ${img.id}`,
            isFeatured: img.isFeatured,
          }));

          setImages(mapped);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Gallery fetch error:", err);
          setError(
            err instanceof Error
              ? err.message
              : t("gallery.failedToLoad", "Failed to load images")
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchImages();

    return () => {
      cancelled = true;
    };
  }, [t]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full flex-1 flex flex-col items-center">
      {loading && (
        <div className="w-full flex flex-wrap gap-6 sm:gap-8 justify-start">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] h-72 sm:h-80 lg:h-[340px] rounded-[24px] sm:rounded-[28px] bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="w-full flex flex-col items-center justify-center py-20 text-center">
          <p className="font-roboto text-red-500 text-base mb-4">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-full border border-[#004560] text-[#004560] hover:bg-[#004560] hover:text-white font-roboto font-semibold text-sm transition-all duration-300 cursor-pointer"
          >
            {t("gallery.tryAgain", "Try Again")}
          </button>
        </div>
      )}

      {!loading && !error && images.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center py-20 text-center">
          <p className="font-roboto text-[#004560] text-base">
            {t("gallery.noImages", "No gallery images are available yet.")}
          </p>
        </div>
      )}

      {!loading && !error && images.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="w-full flex flex-wrap gap-6 sm:gap-8 justify-start"
        >
          {images.slice(0, displayedCount).map((image) => (
            <GalleryCard
              key={image.id}
              image={image}
              onExpand={() => onExpand(image, images)}
            />
          ))}
        </motion.div>
      )}

      {!loading && !error && images.length > 0 && (
        <div className="w-full flex justify-center mt-12 sm:mt-16 mb-4">
          <button
            type="button"
            onClick={() =>
              setDisplayedCount((prev) =>
                prev >= images.length ? 8 : prev + 4
              )
            }
            className="w-full max-w-md sm:max-w-lg py-3 sm:py-3.5 px-8 rounded-full border border-[#004560] text-[#004560] hover:bg-[#004560] hover:text-white font-roboto font-semibold text-sm sm:text-base text-center transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
          >
            {displayedCount >= images.length
              ? t("gallery.showLess", "Show Less")
              : t("blogs.seeMore", "See More")}
          </button>
        </div>
      )}
    </div>
  );
}
