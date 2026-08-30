"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function DestinationsHero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-[#00384D] pt-24 sm:pt-28 lg:pt-28 pb-10 sm:pb-12 lg:pb-5 min-h-[360px] sm:min-h-[400px] lg:min-h-[320px] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 relative z-10 w-full">
        
        {/* ── Left Content (Text) ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full lg:w-[50%] flex flex-col items-start text-left rtl:text-right z-10"
        >
          {/* Subtitle / Script font */}
          <span className="font-montez text-[#69DD84] text-3xl sm:text-4xl md:text-5xl font-normal leading-tight mb-2 tracking-wide">
            {t("destinations.subtitle", "Explore Egypt")}
          </span>

          {/* Main Headline */}
          <h1 className="font-roboto font-semibold text-white text-3xl sm:text-4xl md:text-5xl lg:text-[48px] leading-tight tracking-tight max-w-lg drop-shadow-md">
            {t("destinations.heroTitle", "Discover Destinations That Inspire Every Journey")}
          </h1>
        </motion.div>

        {/* ── Right Content (Decorative Vector Location Pin & Destinations) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full lg:w-[48%] flex items-center justify-center lg:justify-end select-none"
        >
          <div className="relative w-full max-w-[460px] sm:max-w-[500px]">
            <svg
              viewBox="0 0 500 280"
              className="w-full h-auto drop-shadow-sm"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Ground Shadow Radar Ellipses */}
              <ellipse
                cx="250"
                cy="245"
                rx="145"
                ry="22"
                fill="rgba(255, 255, 255, 0.08)"
              />
              <ellipse
                cx="250"
                cy="245"
                rx="80"
                ry="12"
                fill="rgba(255, 255, 255, 0.12)"
              />

              {/* Pin Outline Path */}
              <path
                d="M 250 232 C 205 168 180 128 180 92 C 180 53 211 22 250 22 C 289 22 320 53 320 92 C 320 128 295 168 250 232 Z"
                stroke="rgba(255, 255, 255, 0.65)"
                strokeWidth="1.75"
                fill="none"
              />

              {/* Inner Circle inside Pin Head */}
              <circle
                cx="250"
                cy="92"
                r="32"
                stroke="rgba(255, 255, 255, 0.65)"
                strokeWidth="1.75"
                fill="none"
              />

              {/* Outlined Destination Names */}
              
              {/* 1. Aswan (Top Left) */}
              <text
                x="115"
                y="65"
                textAnchor="middle"
                className="font-roboto select-none"
                style={{
                  fontFamily: "var(--font-roboto), sans-serif",
                  fontSize: "30px",
                  fontWeight: 400,
                  fill: "none",
                  stroke: "rgba(255, 255, 255, 0.8)",
                  strokeWidth: "1.2px",
                  letterSpacing: "0.5px",
                }}
              >
                Aswan
              </text>

              {/* 2. Dahab (Top Right) */}
              <text
                x="395"
                y="65"
                textAnchor="middle"
                className="font-roboto select-none"
                style={{
                  fontFamily: "var(--font-roboto), sans-serif",
                  fontSize: "30px",
                  fontWeight: 400,
                  fill: "none",
                  stroke: "rgba(255, 255, 255, 0.8)",
                  strokeWidth: "1.2px",
                  letterSpacing: "0.5px",
                }}
              >
                Dahab
              </text>

              {/* 3. Luxor (Bottom Left) */}
              <text
                x="130"
                y="225"
                textAnchor="middle"
                className="font-roboto select-none"
                style={{
                  fontFamily: "var(--font-roboto), sans-serif",
                  fontSize: "26px",
                  fontWeight: 400,
                  fill: "none",
                  stroke: "rgba(255, 255, 255, 0.8)",
                  strokeWidth: "1.2px",
                  letterSpacing: "0.5px",
                }}
              >
                Luxor
              </text>

              {/* 4. Giza (Bottom Right) */}
              <text
                x="375"
                y="225"
                textAnchor="middle"
                className="font-roboto select-none"
                style={{
                  fontFamily: "var(--font-roboto), sans-serif",
                  fontSize: "26px",
                  fontWeight: 400,
                  fill: "none",
                  stroke: "rgba(255, 255, 255, 0.8)",
                  strokeWidth: "1.2px",
                  letterSpacing: "0.5px",
                }}
              >
                Giza
              </text>

              {/* 5. Hurghada (Prominent Green Center Overlay) */}
              <text
                x="250"
                y="170"
                textAnchor="middle"
                className="font-roboto select-none"
                style={{
                  fontFamily: "var(--font-roboto), sans-serif",
                  fontSize: "58px",
                  fontWeight: 500,
                  fill: "none",
                  stroke: "#39CA5B",
                  strokeWidth: "1.8px",
                  letterSpacing: "1px",
                }}
              >
                Hurghada
              </text>
            </svg>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
