"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { createBooking, type Booking as ApiBooking } from "@/api/bookings";

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

interface ExtraServiceItem {
  id: string;
  name: string;
  price: number;
}

export interface ActiveBooking {
  tripId: number;
  tripTitle: string;
  tripImage: string;
  tourDate: string;
  adultCount: number;
  adultPrice: number;
  childCount: number;
  childPrice: number;
  selectedExtras: string[];
  packageSubtotal: number;
  extraServicesTotal: number;
  totalAmount: number;
  /** Days of week this trip is available e.g. ["Monday","Wednesday","Friday"] */
  availableDays: string[];
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
  cartItems: CartItem[];
  removeItem: (id: string) => void;
  addItem: (item: CartItem) => void;
  clearCart: () => void;
  resetToDefaults: () => void;
  itemCount: number;
  cartTotalAmount: number;

  activeBooking: ActiveBooking;
  updateActiveBooking: (updates: Partial<ActiveBooking>) => void;

  setBookingFromTour: (tour: {
    id: number;
    title: string;
    image: string;
    adultPrice?: number;
    childPrice?: number;
    price?: number;
    availableDays?: string[];
  }) => void;

  isBookingModalOpen: boolean;
  openBookingModal: (tourData?: any) => void;
  closeBookingModal: () => void;

  confirmedBooking: ConfirmedBooking | null;
  setConfirmedBooking: (
    booking: ConfirmedBooking | null
  ) => void;

  completeBooking: (
    billingData: any
  ) => Promise<ConfirmedBooking>;
}

const AVAILABLE_EXTRAS: ExtraServiceItem[] = [
  {
    id: "health-insurance-30",
    name: "Health Insurance ( $ 30 )",
    price: 30,
  },
  {
    id: "medical-insurance-50",
    name: "Medical Insurance ( $ 50 )",
    price: 50,
  },
  {
    id: "medical-insurance-20",
    name: "Medical insurance",
    price: 20,
  },
];

/*
 * No dummy cart items.
 * Cart items should be added from real API trip data.
 */
const DEFAULT_CART_ITEMS: CartItem[] = [];

const DEFAULT_ACTIVE_BOOKING: ActiveBooking = {
  tripId: 0,
  tripTitle: "",
  tripImage: "",
  tourDate: "",
  adultCount: 1,
  adultPrice: 0,
  childCount: 0,
  childPrice: 0,
  selectedExtras: [],
  packageSubtotal: 0,
  extraServicesTotal: 0,
  totalAmount: 0,
  availableDays: [],
};

const CartContext =
  createContext<CartContextType | undefined>(undefined);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartItems, setCartItems] =
    useState<CartItem[]>(DEFAULT_CART_ITEMS);

  const [activeBooking, setActiveBooking] =
    useState<ActiveBooking>(DEFAULT_ACTIVE_BOOKING);

  const [isBookingModalOpen, setIsBookingModalOpen] =
    useState(false);

  const [confirmedBooking, setConfirmedBooking] =
    useState<ConfirmedBooking | null>(null);

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(
        "egypt_tourism_cart"
      );

      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);

        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      }

      const storedActive = localStorage.getItem(
        "egypt_active_booking"
      );

      if (storedActive) {
        const parsed = JSON.parse(storedActive);

        /*
         * Only restore a real API booking selection.
         * Old dummy bookings used string trip IDs, so they are ignored.
         */
        if (
          typeof parsed.tripId === "number" &&
          parsed.tripId > 0
        ) {
          setActiveBooking(parsed);
        } else {
          localStorage.removeItem(
            "egypt_active_booking"
          );
        }
      }

      const storedConfirmed = localStorage.getItem(
        "egypt_confirmed_booking"
      );

      if (storedConfirmed) {
        const parsedConfirmed =
          JSON.parse(storedConfirmed);

        if (parsedConfirmed?.bookingId) {
          setConfirmedBooking(parsedConfirmed);
        }
      }
    } catch (error) {
      console.error(
        "Failed loading cart/booking data from localStorage",
        error
      );
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    try {
      localStorage.setItem(
        "egypt_tourism_cart",
        JSON.stringify(cartItems)
      );

      localStorage.setItem(
        "egypt_active_booking",
        JSON.stringify(activeBooking)
      );

      if (confirmedBooking) {
        localStorage.setItem(
          "egypt_confirmed_booking",
          JSON.stringify(confirmedBooking)
        );
      }
    } catch (error) {
      console.error(
        "Failed saving cart/booking data",
        error
      );
    }
  }, [
    cartItems,
    activeBooking,
    confirmedBooking,
    isHydrated,
  ]);

  const removeItem = (id: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const addItem = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (currentItem) => currentItem.id === item.id
      );

      if (existing) {
        return prev.map((currentItem) =>
          currentItem.id === item.id
            ? item
            : currentItem
        );
      }

      return [...prev, item];
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  /*
   * There are no hard-coded defaults anymore.
   */
  const resetToDefaults = () => {
    setCartItems([]);
  };

  const updateActiveBooking = (
    updates: Partial<ActiveBooking>
  ) => {
    setActiveBooking((prev) => {
      const updated = {
        ...prev,
        ...updates,
      };

      const adultSubtotal =
        updated.adultCount * updated.adultPrice;

      const childSubtotal =
        updated.childCount * updated.childPrice;

      const packageSubtotal =
        adultSubtotal + childSubtotal;

      const extraServicesTotal =
        updated.selectedExtras.reduce(
          (sum, extraId) => {
            const found = AVAILABLE_EXTRAS.find(
              (extra) => extra.id === extraId
            );

            return (
              sum + (found ? found.price : 0)
            );
          },
          0
        );

      const totalAmount =
        packageSubtotal + extraServicesTotal;

      return {
        ...updated,
        packageSubtotal,
        extraServicesTotal,
        totalAmount,
      };
    });
  };

  const setBookingFromTour = (tour: {
    id: number;
    title: string;
    image: string;
    adultPrice?: number;
    childPrice?: number;
    price?: number;
    availableDays?: string[];
  }) => {
    const adultPrice =
      tour.adultPrice ??
      tour.price ??
      0;

    const childPrice =
      tour.childPrice ??
      0;

    const initialAdults = 1;
    const initialChildren = 0;

    const packageSubtotal =
      initialAdults * adultPrice;

    setActiveBooking({
      tripId: tour.id,
      tripTitle: tour.title,
      tripImage: tour.image || "",

      /*
       * User must select the actual leave date.
       */
      tourDate: "",

      adultCount: initialAdults,
      adultPrice,

      childCount: initialChildren,
      childPrice,

      selectedExtras: [],

      packageSubtotal,
      extraServicesTotal: 0,
      totalAmount: packageSubtotal,

      availableDays: tour.availableDays ?? [],
    });
  };

  const openBookingModal = (
    tourData?: {
      id: number;
      title: string;
      image: string;
      adultPrice?: number;
      childPrice?: number;
      price?: number;
      availableDays?: string[];
    }
  ) => {
    if (tourData) {
      setBookingFromTour(tourData);
    }

    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const completeBooking = async (
    billingData: any
  ): Promise<ConfirmedBooking> => {
    if (
      !activeBooking.tripId ||
      activeBooking.tripId <= 0
    ) {
      throw new Error(
        "Invalid trip selected."
      );
    }

    if (!activeBooking.tourDate) {
      throw new Error(
        "Please select a trip date."
      );
    }

    /*
     * Use the existing authentication token.
     */
    const token =
      localStorage.getItem("admin_access_token");

    if (!token) {
      throw new Error(
        "You must be logged in to complete the booking."
      );
    }

    const bookingPayload = {
      firstName: billingData.firstName,
      lastName: billingData.lastName,
      email: billingData.email,
      phone: billingData.phone,

      /*
       * Temporary Swagger test code.
       * We are not treating this as the promo code.
       */
      code: 512920,

      nationality: billingData.nationality,

      hotelName:
        billingData.hotelName || "",

      roomNo:
        billingData.roomNumber || "",

      tripsBookings: [
        {
          tripId: activeBooking.tripId,
          noAdult: activeBooking.adultCount,
          noChild: activeBooking.childCount,
          leaveDate: activeBooking.tourDate,
        },
      ],
    };

    const booking: ApiBooking = await createBooking(
      bookingPayload,
      token
    );

    /*
     * Backend booking is now the source of truth.
     */
    const newConfirmed: ConfirmedBooking = {
      bookingId: String(booking.id),

      tripTitle: activeBooking.tripTitle,
      tripImage: activeBooking.tripImage,
      tourDate: activeBooking.tourDate,

      adultCount: activeBooking.adultCount,
      childCount: activeBooking.childCount,

      totalAmount:
        typeof booking.totalPrice === "number"
          ? booking.totalPrice
          : activeBooking.totalAmount,

      customerName:
        `${billingData.firstName || ""} ${
          billingData.lastName || ""
        }`.trim(),

      email: billingData.email,
      phone: billingData.phone,
    };

    setConfirmedBooking(newConfirmed);

    try {
      localStorage.setItem(
        "egypt_confirmed_booking",
        JSON.stringify(newConfirmed)
      );
    } catch (error) {
      console.error(
        "Failed saving confirmed booking",
        error
      );
    }

    return newConfirmed;
  };

  const cartTotalAmount =
    cartItems.reduce(
      (sum, item) =>
        sum + item.totalPrice,
      0
    ) +
    (cartItems.length > 0 ? 20 : 0);

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
    throw new Error(
      "useCart must be used within a CartProvider"
    );
  }

  return context;
}