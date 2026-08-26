"use client";

import { useState } from "react";
import { GalleryImage } from "@/data/gallery";
import GalleryHero from "@/components/Gallery/GalleryHero";
import Breadcrumb from "@/components/Breadcrumb";
import GalleryGrid from "@/components/Gallery/GalleryGrid";
import GalleryLightbox from "@/components/Gallery/GalleryLightbox";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <main className="min-h-screen bg-white flex flex-col">

      {/* ── Hero Section ─────────────────────────────────────────── */}
      <GalleryHero />

      {/* ── Breadcrumb ───────────────────────────────────────────── */}
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Gallery" }]} />

      {/* ── Gallery Grid + See More ───────────────────────────────── */}
      <GalleryGrid onExpand={setSelectedImage} />

      {/* ── Lightbox Modal ───────────────────────────────────────── */}
      {selectedImage && (
        <GalleryLightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

    </main>
  );
}
