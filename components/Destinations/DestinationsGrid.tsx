"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getDestinations, type Destination } from "@/api/destinations";
import { allDestinations, type DestinationItem } from "@/data/destinations";
import { API_BASE_URL } from "@/api/apiConfig";
import { useLanguage } from "@/context/LanguageContext";
import DestinationCard from "./DestinationCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

/**
 * Convert a potentially-relative backend image path to an absolute URL.
 * Absolute URLs (http/https) are returned unchanged.
 * Relative paths are prefixed with API_BASE_URL.
 * null is returned as-is so the caller can apply its own fallback.
 */
function resolveImageUrl(imageUrl: string | null): string | null {
  if (!imageUrl) return null;
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  // Strip a leading slash to avoid double-slash
  return `${API_BASE_URL}/${imageUrl.replace(/^\//, "")}`;
}

/**
 * Map an API Destination to the DestinationItem shape that DestinationCard expects.
 * Uses the API imageUrl when present; falls back to the matching local image
 * from the static data file (matched case-insensitively by name).
 */
function toCardItem(dest: Destination): DestinationItem {
  // Try to find a matching local entry for the fallback image
  const localMatch = allDestinations.find(
    (d) => d.name.toLowerCase() === (dest.name ?? "").toLowerCase()
  );

  return {
    id: String(dest.id),
    name: dest.name ?? "Destination",
    tripCount: dest.tripsCount,
    image: resolveImageUrl(dest.imageUrl) ?? localMatch?.image ?? "/images/destination/hurghada.png",
    href: localMatch?.href ?? `/trips?destination=${encodeURIComponent(dest.name ?? "")}`,
  };
}

export default function DestinationsGrid() {
  const { t, language } = useLanguage();
  const [items, setItems] = useState<DestinationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (items.length === 0) {
      setLoading(true);
    }
    getDestinations(undefined, { pageNumber: 1, pageSize: 50, lang: language })
      .then((data) => {
        if (!cancelled) {
          setItems(data.map(toCardItem));
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("[DestinationsGrid] Failed to fetch destinations:", err);
          // Graceful fallback to static data so the page never goes blank
          setError("Could not load destinations from the server.");
          setItems(allDestinations);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [language]);

  if (loading && items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 w-full flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-64 sm:h-72 md:h-80 rounded-[24px] sm:rounded-[28px] bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    // Show static fallback silently (error is logged above)
    // If items were populated from static data, render them normally
    if (items.length === 0) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center text-gray-500 text-sm">
          {t("destinations.unavailable", "Destinations are temporarily unavailable.")}
        </div>
      );
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 w-full flex-1">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        {items.map((dest) => (
          <DestinationCard key={dest.id} dest={dest} />
        ))}
      </motion.div>
    </div>
  );
}
