"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GalleryImage } from "@/modules/gallery.model";
import { useLanguage } from "@/context/LanguageContext";

interface GalleryLightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function GalleryLightbox({
  images,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
}: GalleryLightboxProps) {
  const { t } = useLanguage();
  const image = images[currentIndex];

  if (!image) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-6xl h-[75vh] sm:h-[82vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label={t("gallery.closePreview", "Close preview")}
          className="absolute top-0 right-0 sm:top-2 sm:right-2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-20 transition-colors cursor-pointer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Previous */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={onPrevious}
            aria-label={t("gallery.previous", "Previous image")}
            className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Image */}
        <div className="relative w-full h-full flex items-center justify-center px-12 sm:px-16">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="90vw"
            className="object-contain"
            priority
          />
        </div>

        {/* Next */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={onNext}
            aria-label={t("gallery.next", "Next image")}
            className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}

