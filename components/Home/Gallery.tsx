"use client";

import Image from "next/image";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { GalleryImage } from "@/modules/gallery.model";
import {
  getAllGalleryImages,
  buildImageUrl,
} from "@/api/gallery";
import GalleryLightbox from "@/components/Gallery/GalleryLightbox";

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

function MarqueeCard({
  image,
  onClick,
}: {
  image: GalleryImage;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative w-full h-28 sm:h-34 md:h-38 lg:h-40 rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0 mb-2 sm:mb-3 cursor-pointer group"
      aria-label={image.alt}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 640px) 33vw, (max-width: 1024px) 30vw, 25vw"
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </button>
  );
}

function MarqueeColumn({
  images,
  direction,
  onSelect,
}: {
  images: GalleryImage[];
  direction: "up" | "down";
  onSelect: (image: GalleryImage) => void;
}) {
  const doubled = [...images, ...images];

  return (
    <div className="relative overflow-hidden w-full h-full flex-1 rounded-xl sm:rounded-2xl">
      <div className={direction === "up" ? "marquee-up" : "marquee-down"}>
        {doubled.map((image, index) => (
          <MarqueeCard
            key={`${image.id}-${index}`}
            image={image}
            onClick={() => onSelect(image)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Gallery() {
  const { t } = useLanguage();

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] =
    useState<GalleryImage | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchGallery() {
      try {
        const apiImages = await getAllGalleryImages();

        if (cancelled) return;

        const mapped: GalleryImage[] = apiImages.map((image) => ({
          id: String(image.id),
          src: buildImageUrl(image.imageUrl),
          alt: `${t("gallery.image", "Gallery image")} ${image.id}`,
          isFeatured: image.isFeatured,
        }));

        setImages(mapped);
      } catch (error) {
        console.error("Home gallery fetch error:", error);

        if (!cancelled) {
          setImages([]);
        }
      }
    }

    fetchGallery();

    return () => {
      cancelled = true;
    };
  }, [t]);

  const leftImages = images.slice(0, 3);
  const centerImages = images.slice(3, 5);
  const rightImages = images.slice(5, 8);

  const selectedIndex = selectedImage
    ? images.findIndex((image) => image.id === selectedImage.id)
    : -1;

  const handlePrevious = () => {
    if (images.length <= 1 || selectedIndex === -1) return;

    const previousIndex =
      selectedIndex === 0 ? images.length - 1 : selectedIndex - 1;

    setSelectedImage(images[previousIndex]);
  };

  const handleNext = () => {
    if (images.length <= 1 || selectedIndex === -1) return;

    const nextIndex =
      selectedIndex === images.length - 1 ? 0 : selectedIndex + 1;

    setSelectedImage(images[nextIndex]);
  };

  return (
    <>
      <section className="py-10 sm:py-12 lg:py-14 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-row flex-nowrap items-stretch justify-center gap-3 sm:gap-4 md:gap-5 w-full h-[360px] sm:h-[420px] md:h-[460px] lg:h-[490px]">

            {/* LEFT */}
            <motion.div
              variants={columnVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex-1 min-w-0 h-full flex flex-col"
            >
              {leftImages.length > 0 ? (
                <MarqueeColumn
                  images={leftImages}
                  direction="down"
                  onSelect={setSelectedImage}
                />
              ) : (
                <div className="w-full h-full flex flex-col gap-2.5 sm:gap-3 overflow-hidden">
                  <div className="w-full h-28 sm:h-34 md:h-38 lg:h-40 rounded-xl sm:rounded-2xl bg-gray-100 animate-pulse flex-shrink-0" />
                  <div className="w-full h-28 sm:h-34 md:h-38 lg:h-40 rounded-xl sm:rounded-2xl bg-gray-100 animate-pulse flex-shrink-0" />
                  <div className="w-full h-28 sm:h-34 md:h-38 lg:h-40 rounded-xl sm:rounded-2xl bg-gray-100 animate-pulse flex-shrink-0" />
                </div>
              )}
            </motion.div>

            {/* CENTER */}
            <motion.div
              variants={columnVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex-1 min-w-0 h-full flex flex-col justify-between"
            >
              <motion.div
                variants={headerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col items-center text-center flex-shrink-0"
              >
                <span className="font-montez text-[#39CA5B] text-lg sm:text-2xl lg:text-3xl font-normal leading-tight mb-0.5 sm:mb-1">
                  {t(
                    "gallery.subtitle",
                    "Moments Worth Remembering"
                  )}
                </span>

                <h2 className="font-roboto text-[#006993] text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-bold tracking-tight mb-1 sm:mb-1.5">
                  {t("gallery.title", "Our Gallery")}
                </h2>

                <div className="w-14 sm:w-18 lg:w-20 h-1 sm:h-1.5 bg-[#39CA5B] rounded-full" />
              </motion.div>

              <div className="flex flex-col gap-2.5 sm:gap-3 flex-1 min-h-0 mt-2 sm:mt-3">
                {centerImages.length > 0 ? (
                  centerImages.map((image) => (
                    <button
                      type="button"
                      key={image.id}
                      onClick={() => setSelectedImage(image)}
                      className="relative w-full flex-1 min-h-0 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group"
                      aria-label={image.alt}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 640px) 33vw, (max-width: 1024px) 30vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </button>
                  ))
                ) : (
                  <>
                    <div className="w-full flex-1 min-h-0 rounded-xl sm:rounded-2xl bg-gray-100 animate-pulse" />
                    <div className="w-full flex-1 min-h-0 rounded-xl sm:rounded-2xl bg-gray-100 animate-pulse" />
                  </>
                )}
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              variants={columnVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex-1 min-w-0 h-full flex flex-col"
            >
              {rightImages.length > 0 ? (
                <MarqueeColumn
                  images={rightImages}
                  direction="up"
                  onSelect={setSelectedImage}
                />
              ) : (
                <div className="w-full h-full flex flex-col gap-2.5 sm:gap-3 overflow-hidden">
                  <div className="w-full h-28 sm:h-34 md:h-38 lg:h-40 rounded-xl sm:rounded-2xl bg-gray-100 animate-pulse flex-shrink-0" />
                  <div className="w-full h-28 sm:h-34 md:h-38 lg:h-40 rounded-xl sm:rounded-2xl bg-gray-100 animate-pulse flex-shrink-0" />
                  <div className="w-full h-28 sm:h-34 md:h-38 lg:h-40 rounded-xl sm:rounded-2xl bg-gray-100 animate-pulse flex-shrink-0" />
                </div>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && images.length > 0 && (
          <GalleryLightbox
            images={images}
            currentIndex={selectedIndex}
            onClose={() => setSelectedImage(null)}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </>
  );
}

