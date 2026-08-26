export type TripTypeTag =
  | "All Trips"
  | "Sea Trips"
  | "Safari Trips"
  | "Sneaking Trips"
  | "Historical Trips";

export interface Trip {
  id: string;
  title: string;
  category: string;
  tripTypeTag: TripTypeTag;
  location: string;
  rating: number;
  reviewsCount: number;
  price: number;
  priceFormatted: string;
  image: string;
  slug: string;
}

export const allTripsData: Trip[] = [
  {
    id: "1",
    title: "Island Trip",
    category: "Sea Trip",
    tripTypeTag: "Sea Trips",
    location: "Hurghada",
    rating: 4.8,
    reviewsCount: 345,
    price: 30.6,
    priceFormatted: "$ 30.6 USA",
    image: "/images/home/bestselling/IslandTrip.jpg",
    slug: "island-trip",
  },
  {
    id: "2",
    title: "Luxor Day Tour",
    category: "Historical Trip",
    tripTypeTag: "Historical Trips",
    location: "Luxor",
    rating: 4.8,
    reviewsCount: 345,
    price: 30.6,
    priceFormatted: "$ 30.6 USA",
    image: "/images/home/bestselling/LuxorDayTour.jpg",
    slug: "luxor-day-tour",
  },
  {
    id: "3",
    title: "Desert Safari Quad Adventure",
    category: "Safari Trip",
    tripTypeTag: "Safari Trips",
    location: "Hurghada",
    rating: 4.8,
    reviewsCount: 345,
    price: 30.6,
    priceFormatted: "$ 30.6 USA",
    image: "/images/home/bestselling/DesertSafariQuadAdventure.jpg",
    slug: "desert-safari-quad",
  },
  {
    id: "4",
    title: "Snorkeling Trip to Orange Bay",
    category: "Sea Trip",
    tripTypeTag: "Sneaking Trips",
    location: "Hurghada",
    rating: 4.8,
    reviewsCount: 345,
    price: 30.6,
    priceFormatted: "$ 30.6 USA",
    image: "/images/home/bestselling/SnorkelingTriptoOrangeBay.jpg",
    slug: "snorkeling-orange-bay",
  },
  {
    id: "5",
    title: "Red Sea Diving Experience",
    category: "Sea Trip",
    tripTypeTag: "Sea Trips",
    location: "Hurghada",
    rating: 4.9,
    reviewsCount: 220,
    price: 45.0,
    priceFormatted: "$ 45.0 USA",
    image: "/images/home/categories/diving.jpg",
    slug: "red-sea-diving",
  },
  {
    id: "6",
    title: "Giza Pyramids & Sphinx Adventure",
    category: "Historical Trip",
    tripTypeTag: "Historical Trips",
    location: "Giza",
    rating: 4.9,
    reviewsCount: 512,
    price: 55.0,
    priceFormatted: "$ 55.0 USA",
    image: "/images/home/PopularDestinations/giza.png",
    slug: "giza-pyramids-tour",
  },
];

export const tripTypeOptions = [
  { label: "All Trips", count: 47 },
  { label: "Sea Trips", count: 20 },
  { label: "Safari Trips", count: 18 },
  { label: "Sneaking Trips", count: 12 },
  { label: "Historical Trips", count: 7 },
] as const;
