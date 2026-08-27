"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { GalleryImage } from "@/data/gallery";
import GalleryHero from "@/components/Gallery/GalleryHero";
import Breadcrumb from "@/components/Breadcrumb";
import GalleryGrid from "@/components/Gallery/GalleryGrid";
import GalleryLightbox from "@/components/Gallery/GalleryLightbox";
import { useLanguage } from "@/context/LanguageContext";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white flex flex-col">

      {/* ── Hero Section ─────────────────────────────────────────── */}
      <GalleryHero />

      {/* ── Breadcrumb ───────────────────────────────────────────── */}
      <Breadcrumb items={[{ label: t("nav.home", "Home"), href: "/" }, { label: t("nav.gallery", "Gallery") }]} />

      {/* ── Gallery Grid + See More ───────────────────────────────── */}
      <GalleryGrid onExpand={setSelectedImage} />

      {/* ── Lightbox Modal ───────────────────────────────────────── */}
      <AnimatePresence>
        {selectedImage && (
          <GalleryLightbox
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>

    </main>
  );
}
