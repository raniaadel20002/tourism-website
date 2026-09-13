"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import BookingModal from "@/components/Cart/BookingModal";
import { CartProvider } from "@/context/CartContext";

export default function PublicLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  const isConfirmationPage = pathname.includes("/confirmation");

  return (
    <CartProvider>
      {!isConfirmationPage && <Navbar />}

      <main className="flex-1">{children}</main>

      {!isConfirmationPage && <Footer />}

      <BookingModal />
    </CartProvider>
  );
}

