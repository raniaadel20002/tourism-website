"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { GalleryImage } from "@/modules/gallery.model";
import GalleryHero from "@/components/Gallery/GalleryHero";
import Breadcrumb from "@/components/Breadcrumb";
import GalleryGrid from "@/components/Gallery/GalleryGrid";
import GalleryLightbox from "@/components/Gallery/GalleryLightbox";
import { useLanguage } from "@/context/LanguageContext";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const { t } = useLanguage();

  const selectedIndex = selectedImage
    ? galleryImages.findIndex((image) => image.id === selectedImage.id)
    : -1;

  const handleExpand = (
    image: GalleryImage,
    images: GalleryImage[]
  ) => {
    setGalleryImages(images);
    setSelectedImage(image);
  };

  const handlePrevious = () => {
    if (galleryImages.length <= 1 || selectedIndex === -1) return;

    const previousIndex =
      selectedIndex === 0
        ? galleryImages.length - 1
        : selectedIndex - 1;

    setSelectedImage(galleryImages[previousIndex]);
  };

  const handleNext = () => {
    if (galleryImages.length <= 1 || selectedIndex === -1) return;

    const nextIndex =
      selectedIndex === galleryImages.length - 1
        ? 0
        : selectedIndex + 1;

    setSelectedImage(galleryImages[nextIndex]);
  };

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <GalleryHero />

      <Breadcrumb
        items={[
          { label: t("nav.home", "Home"), href: "/" },
          { label: t("nav.gallery", "Gallery") },
        ]}
      />

      <GalleryGrid onExpand={handleExpand} />

      <AnimatePresence>
        {selectedImage && galleryImages.length > 0 && (
          <GalleryLightbox
            images={galleryImages}
            currentIndex={selectedIndex}
            onClose={() => setSelectedImage(null)}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

