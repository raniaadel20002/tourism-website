import { NextRequest, NextResponse } from "next/server";

const supportedLanguages = ["en", "fr", "ru", "ro"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Skip non-page requests ─────────────────────────────────────
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/admin") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // ── Detect language from the LAST segment ──────────────────────
  const segments = pathname.split("/").filter(Boolean); // e.g. ["trips", "cairo-trip", "fr"]
  const lastSegment = segments[segments.length - 1];

  if (lastSegment && supportedLanguages.includes(lastSegment)) {
    // Strip the language segment to get the real route
    const routeSegments = segments.slice(0, -1); // e.g. ["trips", "cairo-trip"]
    const newPathname = "/" + routeSegments.join("/"); // e.g. "/trips/cairo-trip" or "/"

    const url = request.nextUrl.clone();
    url.pathname = newPathname || "/";

    return NextResponse.rewrite(url);
  }

  // ── No language segment found → redirect to append /en ─────────
  // Try to read preferred language from localStorage cookie fallback
  let fallbackLang = "en";
  const cookieLang = request.cookies.get("tourism_lang")?.value;
  if (cookieLang && supportedLanguages.includes(cookieLang)) {
    fallbackLang = cookieLang;
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${fallbackLang}` : `${pathname}/${fallbackLang}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};