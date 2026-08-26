"use client";

import { useCart } from "@/context/CartContext";
import CartPageHeader from "@/components/Cart/CartPageHeader";
import CartFilled from "@/components/Cart/CartFilled";
import CartEmpty from "@/components/Cart/CartEmpty";

export default function BookingCartPage() {
  const { cartItems, resetToDefaults } = useCart();

  return (
    <div className="min-h-screen bg-[#fafbfc] pt-24 sm:pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <CartPageHeader />

        {/* Filled or Empty State */}
        {cartItems.length > 0 ? (
          <CartFilled cartItems={cartItems} />
        ) : (
          <CartEmpty onReset={resetToDefaults} />
        )}

      </div>
    </div>
  );
}
