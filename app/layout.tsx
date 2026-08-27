import type { Metadata } from "next";
import { Geist, Geist_Mono, Montez, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import BookingModal from "@/components/Cart/BookingModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montez = Montez({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-montez",
  display: "swap",
});

const roboto = Roboto({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Egypt Tourism – Explore Every Journey",
  description:
    "Discover Egypt's wonders – from the golden dunes of the Sahara to the vibrant coral reefs of the Red Sea. Book unforgettable tours and adventures.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${montez.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <BookingModal />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
