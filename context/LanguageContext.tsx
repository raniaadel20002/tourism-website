"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import ru from "@/locales/ru.json";
import ro from "@/locales/ro.json";

export type LanguageCode = "en" | "fr" | "ru" | "ro";

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr", flag: "🇬🇧" },
  { code: "fr", name: "French", nativeName: "Français", dir: "ltr", flag: "🇫🇷" },
  { code: "ru", name: "Russian", nativeName: "Русский", dir: "ltr", flag: "🇷🇺" },
  { code: "ro", name: "Romanian", nativeName: "Română", dir: "ltr", flag: "🇷🇴" },
];

const translations: Record<LanguageCode, any> = {
  en,
  fr,
  ru,
  ro,
};

interface LanguageContextType {
  language: LanguageCode;
  dir: "ltr" | "rtl";
  isRTL: boolean;
  currentLanguageInfo: LanguageInfo;
  changeLanguage: (code: LanguageCode) => void;
  t: (path: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>("en");

  // Load persisted language from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("tourism_lang") as LanguageCode | null;
      if (saved && ["en", "fr", "ru", "ro"].includes(saved)) {
        setLanguage(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  // Update HTML document lang and dir attributes on change
  useEffect(() => {
    const dir = "ltr";
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    try {
      localStorage.setItem("tourism_lang", language);
    } catch {
      // ignore
    }
  }, [language]);

  const currentLanguageInfo = useMemo(() => {
    return (
      SUPPORTED_LANGUAGES.find((lang) => lang.code === language) ||
      SUPPORTED_LANGUAGES[0]
    );
  }, [language]);

  const dir = currentLanguageInfo.dir;
  const isRTL = dir === "rtl";

  const changeLanguage = (code: LanguageCode) => {
    if (["en", "fr", "ru", "ro"].includes(code)) {
      setLanguage(code);
    }
  };

  /**
   * Helper function to retrieve nested keys like "nav.home" or "hero.search.destination"
   */
  const t = (path: string, fallback?: string): string => {
    const keys = path.split(".");
    let current: any = translations[language];

    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        // Fallback to English
        let enCurrent: any = translations["en"];
        for (const ek of keys) {
          if (enCurrent && typeof enCurrent === "object" && ek in enCurrent) {
            enCurrent = enCurrent[ek];
          } else {
            return fallback || path;
          }
        }
        return typeof enCurrent === "string" ? enCurrent : fallback || path;
      }
    }

    return typeof current === "string" ? current : fallback || path;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        dir,
        isRTL,
        currentLanguageInfo,
        changeLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
