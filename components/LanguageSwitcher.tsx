"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, SUPPORTED_LANGUAGES, LanguageCode } from "@/context/LanguageContext";

interface LanguageSwitcherProps {
  variant?: "desktop" | "mobile";
  dropdownAlign?: "left" | "right";
  onSelect?: () => void;
}

export default function LanguageSwitcher({ variant = "desktop", dropdownAlign = "right", onSelect }: LanguageSwitcherProps) {
  const { language, changeLanguage, isRTL, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getFlagImageUrl = (code: string) => {
    const map: Record<string, string> = {
      en: "gb",
      fr: "fr",
      ru: "ru",
      ro: "ro",
    };
    const countryCode = map[code] || "gb";
    return `https://flagcdn.com/w20/${countryCode}.png`;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: LanguageCode) => {
    changeLanguage(code);
    setIsOpen(false);
    onSelect?.();
  };

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  if (variant === "mobile") {
    return (
      <div className="pt-2 pb-1 border-t border-gray-100">
        <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          {t("nav.changeLanguage", "Language")}
        </span>
        <div className="grid grid-cols-2 gap-2">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelect(lang.code)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                language === lang.code
                  ? "bg-[#004560] text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <img src={getFlagImageUrl(lang.code)} alt={`${lang.code} flag`} width={16} height={12} className="w-4 h-3 object-cover rounded-[2px] shadow-sm" />
              <span className="truncate">{lang.nativeName}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-gray-700 hover:text-[#004560] hover:bg-gray-50 transition-colors text-xs sm:text-sm font-medium cursor-pointer"
        aria-label={t("nav.changeLanguage", "Change Language")}
        aria-expanded={isOpen}
      >
        {/* Globe icon */}
        <svg
          className="w-4 h-4 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <img src={getFlagImageUrl(currentLang.code)} alt={`${currentLang.code} flag`} width={16} height={12} className="w-4 h-3 object-cover rounded-[2px] shadow-sm" />
        <span className="uppercase text-xs font-semibold text-gray-800">{currentLang.code}</span>

        <svg
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute z-50 mt-2 w-44 rounded-2xl bg-white shadow-xl border border-gray-100 py-1.5 overflow-hidden ${
              dropdownAlign === "left"
                ? (isRTL ? "right-0 origin-top-right" : "left-0 origin-top-left")
                : (isRTL ? "left-0 origin-top-left" : "right-0 origin-top-right")
            }`}
          >
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-emerald-50 text-[#004560] font-bold"
                      : "text-gray-700 hover:bg-gray-50 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <img src={getFlagImageUrl(lang.code)} alt={`${lang.code} flag`} width={16} height={12} className="w-4 h-3 object-cover rounded-[2px] shadow-sm" />
                    <span>{lang.nativeName}</span>
                  </div>
                  {isSelected && (
                    <svg
                      className="w-4 h-4 text-[#39CA5B]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
