import type { Metadata } from "next";
import { Montez, Roboto } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import PublicLayoutWrapper from "@/components/Layout/PublicLayoutWrapper";

const montez = Montez({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-montez",
});

const roboto = Roboto({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "SunnySide Tours",
  description:
    "Discover the world with SunnySide Tours – curated travel experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montez.variable} ${roboto.variable} min-h-full flex flex-col`}
      >
        <LanguageProvider>
          <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}