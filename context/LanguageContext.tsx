"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { usePathname, useRouter } from "next/navigation";
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
  {
    code: "en",
    name: "English",
    nativeName: "English",
    dir: "ltr",
    flag: "🇬🇧",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    dir: "ltr",
    flag: "🇫🇷",
  },
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    dir: "ltr",
    flag: "🇷🇺",
  },
  {
    code: "ro",
    name: "Romanian",
    nativeName: "Română",
    dir: "ltr",
    flag: "🇷🇴",
  },
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
  localizedHref: (href: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

function isLanguageCode(value: string): value is LanguageCode {
  return ["en", "fr", "ru", "ro"].includes(value);
}

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const getLanguageFromPath = (): LanguageCode => {
    // Language is the LAST segment of the URL
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];

    return lastSegment && isLanguageCode(lastSegment) ? lastSegment : "en";
  };

  const [language, setLanguage] = useState<LanguageCode>(
    getLanguageFromPath()
  );

  useEffect(() => {
    const urlLanguage = getLanguageFromPath();

    if (urlLanguage !== language) {
      setLanguage(urlLanguage);
    }
  }, [pathname]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = "ltr";

    // Store in cookie for middleware redirect fallback
    try {
      document.cookie = `tourism_lang=${language};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    } catch {
      // ignore
    }

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
    if (!isLanguageCode(code) || code === language) {
      return;
    }

    // Replace the LAST segment with the new language code
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];

    if (lastSegment && isLanguageCode(lastSegment)) {
      segments[segments.length - 1] = code;
    } else {
      segments.push(code);
    }

    const newPath = "/" + segments.join("/");
    // Preserve the current query string during language switch (client-side only)
    const qs = typeof window !== "undefined" ? window.location.search : "";
    const finalPath = qs ? `${newPath}${qs}` : newPath;

    setLanguage(code);
    router.push(finalPath);
  };

  /**
   * Build a localized href by appending the current language as the last segment.
   * Handles query strings: "/trips?type=Safari" → "/trips/{lang}?type=Safari"
   * Home "/" → "/{lang}"
   */
  const localizedHref = useCallback(
    (href: string): string => {
      // Separate path from query string
      const [pathPart, ...rest] = href.split("?");
      const query = rest.length > 0 ? "?" + rest.join("?") : "";

      // Clean trailing slash
      const cleanPath = pathPart.replace(/\/+$/, "") || "";

      // Guard: if the path already ends with a supported lang code, replace it
      const pathSegments = cleanPath.split("/").filter(Boolean);
      const lastSeg = pathSegments[pathSegments.length - 1];
      if (lastSeg && isLanguageCode(lastSeg)) {
        pathSegments[pathSegments.length - 1] = language;
        return "/" + pathSegments.join("/") + query;
      }

      // Build localized path
      const localizedPath = cleanPath === "" ? `/${language}` : `${cleanPath}/${language}`;
      return localizedPath + query;
    },
    [language]
  );

  const t = (path: string, fallback?: string): string => {
    const keys = path.split(".");
    let current: any = translations[language];

    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        let enCurrent: any = translations.en;

        for (const ek of keys) {
          if (
            enCurrent &&
            typeof enCurrent === "object" &&
            ek in enCurrent
          ) {
            enCurrent = enCurrent[ek];
          } else {
            return fallback || path;
          }
        }

        return typeof enCurrent === "string"
          ? enCurrent
          : fallback || path;
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
        localizedHref,
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