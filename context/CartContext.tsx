"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  title: string;
  summaryTitle?: string;
  category: string;
  categoryType?: "sea" | "historical" | "safari" | "diving" | string;
  location: string;
  date: string;
  summaryDate?: string;
  adults: number;
  pricePerPerson: number;
  totalPrice: number;
  image: string;
  slug?: string;
}

export interface ExtraServiceItem {
  id: string;
  name: string;
  price: number;
}

export interface ActiveBooking {
  tripId: string;
  tripTitle: string;
  tripImage: string;
  tourDate: string; // e.g. "23/1/2025" or "2025-01-23"
  adultCount: number;
  adultPrice: number;
  childCount: number;
  childPrice: number;
  selectedExtras: string[]; // IDs of selected extra services
  packageSubtotal: number;
  extraServicesTotal: number;
  totalAmount: number;
}

interface ConfirmedBooking {
  bookingId: string;
  tripTitle: string;
  tripImage: string;
  tourDate: string;
  adultCount: number;
  childCount: number;
  totalAmount: number;
  customerName?: string;
  email?: string;
  phone?: string;
}

interface CartContextType {
  // Cart
  cartItems: CartItem[];
  removeItem: (id: string) => void;
  addItem: (item: CartItem) => void;
  clearCart: () => void;
  resetToDefaults: () => void;
  itemCount: number;
  cartTotalAmount: number;

  // Active Single Booking / Flow
  activeBooking: ActiveBooking;
  updateActiveBooking: (updates: Partial<ActiveBooking>) => void;
  setBookingFromTour: (tour: {
    id: string;
    title: string;
    image: string;
    adultPrice?: number;
    childPrice?: number;
    price?: number;
  }) => void;

  // Modal control
  isBookingModalOpen: boolean;
  openBookingModal: (tourData?: any) => void;
  closeBookingModal: () => void;

  // Confirmation
  confirmedBooking: ConfirmedBooking | null;
  setConfirmedBooking: (booking: ConfirmedBooking | null) => void;
  completeBooking: (billingData: any) => ConfirmedBooking;
}

const DEFAULT_CART_ITEMS: CartItem[] = [
  {
    id: "cart-orange-bay",
    title: "Orange Bay Island Trip",
    summaryTitle: "Orange Bay Island Trip",
    category: "Sea Trip",
    categoryType: "sea",
    location: "Hurghada",
    date: "20 June 2026",
    summaryDate: "20/6/2025",
    adults: 2,
    pricePerPerson: 35,
    totalPrice: 70,
    image: "/images/home/tours/orange_bay_stairs.jpg",
    slug: "snorkeling-orange-bay",
  },
  {
    id: "cart-balloon-luxor",
    title: "Hot Air Balloon Ride – Luxor",
    summaryTitle: "Hot Air Balloon Ride in Luxor",
    category: "Historical",
    categoryType: "historical",
    location: "Luxor",
    date: "18 June 2026",
    summaryDate: "18/6/2025",
    adults: 2,
    pricePerPerson: 30,
    totalPrice: 60,
    image: "/images/home/tours/hot_air_balloon_luxor.jpg",
    slug: "luxor-day-tour",
  },
];

const AVAILABLE_EXTRAS: ExtraServiceItem[] = [
  { id: "health-insurance-30", name: "Health Insurance ( $ 30 )", price: 30 },
  { id: "medical-insurance-50", name: "Medical Insurance ( $ 50 )", price: 50 },
  { id: "medical-insurance-20", name: "Medical insurance", price: 20 },
];

const DEFAULT_ACTIVE_BOOKING: ActiveBooking = {
  tripId: "luxor-day-tour",
  tripTitle: "Luxor Full-Day Heritage Tour",
  tripImage: "/images/home/bestselling/LuxorDayTour.jpg",
  tourDate: "23/1/2025",
  adultCount: 1,
  adultPrice: 65,
  childCount: 0,
  childPrice: 40,
  selectedExtras: [],
  packageSubtotal: 65,
  extraServicesTotal: 0,
  totalAmount: 65,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(DEFAULT_CART_ITEMS);
  const [activeBooking, setActiveBooking] = useState<ActiveBooking>(DEFAULT_ACTIVE_BOOKING);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("egypt_tourism_cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
      const storedActive = localStorage.getItem("egypt_active_booking");
      if (storedActive) {
        setActiveBooking(JSON.parse(storedActive));
      }
      const storedConfirmed = localStorage.getItem("egypt_confirmed_booking");
      if (storedConfirmed) {
        setConfirmedBooking(JSON.parse(storedConfirmed));
      }
    } catch (e) {
      console.error("Failed loading from localStorage", e);
    }
    setIsHydrated(true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem("egypt_tourism_cart", JSON.stringify(cartItems));
        localStorage.setItem("egypt_active_booking", JSON.stringify(activeBooking));
        if (confirmedBooking) {
          localStorage.setItem("egypt_confirmed_booking", JSON.stringify(confirmedBooking));
        }
      } catch (e) {
        console.error("Failed saving to localStorage", e);
      }
    }
  }, [cartItems, activeBooking, confirmedBooking, isHydrated]);

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addItem = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? item : i));
      }
      return [...prev, item];
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const resetToDefaults = () => {
    setCartItems(DEFAULT_CART_ITEMS);
  };

  const updateActiveBooking = (updates: Partial<ActiveBooking>) => {
    setActiveBooking((prev) => {
      const updated = { ...prev, ...updates };

      const adultSubtotal = updated.adultCount * updated.adultPrice;
      const childSubtotal = updated.childCount * updated.childPrice;
      const packageSubtotal = adultSubtotal + childSubtotal;

      const extraServicesTotal = updated.selectedExtras.reduce((sum, extraId) => {
        const found = AVAILABLE_EXTRAS.find((e) => e.id === extraId);
        return sum + (found ? found.price : 0);
      }, 0);

      const totalAmount = packageSubtotal + extraServicesTotal;

      return {
        ...updated,
        packageSubtotal,
        extraServicesTotal,
        totalAmount,
      };
    });
  };

  const setBookingFromTour = (tour: {
    id: string;
    title: string;
    image: string;
    adultPrice?: number;
    childPrice?: number;
    price?: number;
  }) => {
    const adultPrice = tour.adultPrice || (tour.price ? Math.round(tour.price) : 65);
    const childPrice = tour.childPrice || 40;
    const initialAdults = 1;
    const initialChildren = 0;
    const packageSubtotal = initialAdults * adultPrice;

    setActiveBooking({
      tripId: tour.id,
      tripTitle: tour.title,
      tripImage: tour.image || "/images/home/bestselling/LuxorDayTour.jpg",
      tourDate: "23/1/2025",
      adultCount: initialAdults,
      adultPrice: adultPrice,
      childCount: initialChildren,
      childPrice: childPrice,
      selectedExtras: [],
      packageSubtotal: packageSubtotal,
      extraServicesTotal: 0,
      totalAmount: packageSubtotal,
    });
  };

  const openBookingModal = (tourData?: any) => {
    if (tourData) {
      setBookingFromTour(tourData);
    }
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const completeBooking = (billingData: any) => {
    const newConfirmed: ConfirmedBooking = {
      bookingId: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
      tripTitle: activeBooking.tripTitle,
      tripImage: activeBooking.tripImage,
      tourDate: activeBooking.tourDate,
      adultCount: activeBooking.adultCount,
      childCount: activeBooking.childCount,
      totalAmount: activeBooking.totalAmount,
      customerName: `${billingData.firstName || ""} ${billingData.lastName || ""}`.trim(),
      email: billingData.email,
      phone: billingData.phone,
    };

    setConfirmedBooking(newConfirmed);
    try {
      localStorage.setItem("egypt_confirmed_booking", JSON.stringify(newConfirmed));
    } catch (e) {}

    return newConfirmed;
  };

  const cartTotalAmount =
    cartItems.reduce((sum, item) => sum + item.totalPrice, 0) + (cartItems.length > 0 ? 20 : 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        removeItem,
        addItem,
        clearCart,
        resetToDefaults,
        itemCount: cartItems.length,
        cartTotalAmount,
        activeBooking,
        updateActiveBooking,
        setBookingFromTour,
        isBookingModalOpen,
        openBookingModal,
        closeBookingModal,
        confirmedBooking,
        setConfirmedBooking,
        completeBooking,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
