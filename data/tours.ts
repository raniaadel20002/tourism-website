import type { Tour, Category } from "@/types/tour";

const categories: Category[] = [
  {
    id: "1",
    name: "Diving",
    slug: "diving",
    image: "/images/home/categories/diving.jpg",
    tourCount: 12,
  },
  {
    id: "2",
    name: "Boat Trip",
    slug: "boat-trip",
    image: "/images/home/categories/BoatTrip.jpg",
    tourCount: 8,
  },
  {
    id: "3",
    name: "Snorkelling",
    slug: "snorkelling",
    image: "/images/home/categories/Snorkelling.jpg",
    tourCount: 15,
  },
  {
    id: "4",
    name: "Desert Safari",
    slug: "desert-safari",
    image: "/images/home/categories/DesertSafari.jpg",
    tourCount: 10,
  },
];

const tours: Tour[] = [
  {
    id: "luxor-day-tour",
    slug: "luxor-day-tour",
    title: "Luxor Day Tour",
    category: "Historical Trip",
    tripTypeTag: "Historical Trips",
    price: 30.6,
    priceFormatted: "$ 30.6 USA",
    adultPrice: 65,
    childPrice: 40,
    duration: "1 Full Day (8-10 Hours)",
    rating: 4.8,
    reviewCount: 25,
    reviewsSummaryCount: 653,
    ratingBreakdown: { 5: 80, 4: 65, 3: 40, 2: 25, 1: 10 },
    image: "/images/home/bestselling/LuxorDayTour.jpg",
    gallery: [
      "/images/home/Blogs/afbce762e899ad363b746ae91fc0c11c35ac147d.jpg",
      "/images/home/Gallery/Frame1171276590.png",
      "/images/home/PopularDestinations/aswan.png",
      "/images/home/PopularDestinations/giza.png",
    ],
    description:
      "Experience the timeless beauty of Luxor on a full-day guided journey through Egypt's greatest ancient wonders. Visit magnificent temples, explore the Valley of the Kings, and uncover thousands of years of fascinating history with an expert local guide.",
    location: "Luxor",
    tourType: "Historical Tour",
    transportation: "Air-conditioned Vehicle",
    availability: "Daily",
    language: "English / Arabic",
    isBestSeller: true,
    included: [
      "Hotel pickup & drop-off",
      "Professional Egyptologist guide",
      "Air-conditioned transportation",
      "Bottled water",
      "Entrance tickets (optional package)",
      "Lunch at a local restaurant (optional)",
    ],
    excluded: [
      "Personal expenses",
      "Tips & gratuities",
      "Optional activities",
    ],
    highlights: [
      "Explore the magnificent Karnak Temple.",
      "Visit the legendary Valley of the Kings.",
      "Discover the Temple of Hatshepsut.",
      "Stop at the Colossi of Memnon.",
    ],
    testimonials: [
      {
        id: "t1",
        name: "Daniel Brown",
        location: "Australia",
        date: "12 Jun 2026",
        quote:
          "From the moment we arrived until the end of our tour, everything felt seamless. It was one of the best travel experiences we've ever had.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
      },
      {
        id: "t2",
        name: "Sarah Jenkins",
        location: "United Kingdom",
        date: "18 Jun 2026",
        quote:
          "Our Egyptologist guide was phenomenal! The Valley of the Kings was breathtaking and lunch was authentic and delicious.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
      },
    ],
  },
  {
    id: "island-trip",
    slug: "island-trip",
    title: "Island Trip to Giftun & Orange Bay",
    category: "Sea Trip",
    tripTypeTag: "Sea Trips",
    price: 30.6,
    priceFormatted: "$ 30.6 USA",
    adultPrice: 55,
    childPrice: 35,
    duration: "1 Full Day (7-8 Hours)",
    rating: 4.8,
    reviewCount: 345,
    reviewsSummaryCount: 520,
    ratingBreakdown: { 5: 85, 4: 55, 3: 30, 2: 15, 1: 5 },
    image: "/images/home/bestselling/IslandTrip.jpg",
    gallery: [
      "/images/home/Gallery/Frame1171276587.png",
      "/images/home/Gallery/Frame1171276592.png",
      "/images/home/Gallery/Frame1171276591.png",
      "/images/home/categories/BoatTrip.jpg",
    ],
    description:
      "Sail to the paradise shores of Orange Bay on Giftun Island. Enjoy crystal-clear shallow turquoise waters, white sandy beaches, two guided snorkeling stops at vibrant coral reefs, and an open buffet lunch onboard.",
    location: "Hurghada",
    tourType: "Sea Trip",
    transportation: "Luxury Boat / Yacht",
    availability: "Daily",
    language: "English / German / Arabic",
    isBestSeller: true,
    included: [
      "Hotel pickup & return transfers",
      "Full day yacht cruise with sun deck",
      "Snorkeling equipment (masks & fins)",
      "Delicious open buffet lunch onboard",
      "Fresh fruits, soft drinks & bottled water",
      "2 hours stay on Orange Bay island beach",
    ],
    excluded: [
      "National park environmental fee ($5)",
      "Personal photo & video packages",
      "Tips for boat crew",
    ],
    highlights: [
      "Relax on the wooden sunbeds and sea swings of Orange Bay.",
      "Snorkel at two top protected coral reefs in the Red Sea.",
      "Enjoy watersports like banana boat and sofa rides.",
      "Savor a freshly prepared seafood and grill buffet lunch.",
    ],
    testimonials: [
      {
        id: "t1",
        name: "Sophie Laurent",
        location: "France",
        date: "20 Jun 2026",
        quote:
          "Orange Bay felt like the Maldives in Egypt! The water clarity was unreal and the boat crew took such great care of us.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
      },
    ],
  },
  {
    id: "desert-safari-quad",
    slug: "desert-safari-quad",
    title: "Desert Safari Quad Adventure",
    category: "Safari Trip",
    tripTypeTag: "Safari Trips",
    price: 30.6,
    priceFormatted: "$ 30.6 USA",
    adultPrice: 45,
    childPrice: 30,
    duration: "Half Day (5 Hours)",
    rating: 4.8,
    reviewCount: 345,
    reviewsSummaryCount: 410,
    ratingBreakdown: { 5: 75, 4: 60, 3: 35, 2: 10, 1: 5 },
    image: "/images/home/bestselling/DesertSafariQuadAdventure.jpg",
    gallery: [
      "/images/home/categories/DesertSafari.jpg",
      "/images/home/howItWorks/icon1.png",
      "/images/home/PopularDestinations/hurghada.png",
      "/images/home/Gallery/Frame1171276588.png",
    ],
    description:
      "Conquer the Eastern Sahara desert on an adrenaline-charged quad bike safari. Ride across rolling sand dunes, visit an authentic Bedouin village, enjoy camel rides, and savor a sunset BBQ dinner with oriental show.",
    location: "Hurghada",
    tourType: "Safari Trip",
    transportation: "4x4 Land Cruiser & ATV Quads",
    availability: "Daily (Morning & Sunset)",
    language: "English / Arabic / Russian",
    isBestSeller: true,
    included: [
      "Hotel pickup & drop-off in 4WD Jeep",
      "Quad bike (ATV) drive (approx. 45 km)",
      "Bedouin village tour with herbal tea",
      "Camel ride experience",
      "Open BBQ buffet dinner & soft drinks",
      "Oriental Tanoura dance & fire show",
    ],
    excluded: [
      "Desert scarf (keffiyeh) & dust goggles",
      "Personal photos & DVD souvenirs",
      "Gratuities for safari guide",
    ],
    highlights: [
      "Thrilling ATV quad bike drive across open desert dunes.",
      "Immerse in traditional Bedouin culture and lifestyle.",
      "Scenic camel ride overlooking the Red Sea mountain ranges.",
      "Sunset barbecue under the starry Arabian desert sky.",
    ],
    testimonials: [
      {
        id: "t1",
        name: "Marcus Vance",
        location: "Germany",
        date: "05 Jun 2026",
        quote:
          "Pure adrenaline! Riding the quad bikes through the desert canyons at sunset was unforgettable.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
      },
    ],
  },
  {
    id: "snorkeling-orange-bay",
    slug: "snorkeling-orange-bay",
    title: "Snorkeling Trip to Orange Bay",
    category: "Sea Trip",
    tripTypeTag: "Sneaking Trips",
    price: 30.6,
    priceFormatted: "$ 30.6 USA",
    adultPrice: 50,
    childPrice: 30,
    duration: "1 Full Day (8 Hours)",
    rating: 4.8,
    reviewCount: 345,
    reviewsSummaryCount: 490,
    ratingBreakdown: { 5: 80, 4: 60, 3: 30, 2: 20, 1: 5 },
    image: "/images/home/bestselling/SnorkelingTriptoOrangeBay.jpg",
    gallery: [
      "/images/home/categories/Snorkelling.jpg",
      "/images/home/Gallery/Frame1171276589.png",
      "/images/home/Gallery/Frame1171276593.png",
      "/images/home/Blogs/406065c289068fca584e70b62f59ca7257238059.jpg",
    ],
    description:
      "Immerse yourself in the Red Sea's most vibrant marine ecosystems. Snorkel alongside exotic tropical fish, sea turtles, and colorful coral reefs before unwinding on the white sands of Orange Bay.",
    location: "Hurghada",
    tourType: "Sea & Snorkel Tour",
    transportation: "Sea Yacht",
    availability: "Daily",
    language: "English / German / Arabic",
    isBestSeller: true,
    included: [
      "Hotel transfers in air-conditioned van",
      "High-grade snorkeling gear and life vests",
      "Guided snorkeling with expert marine guide",
      "Buffet lunch with salads, rice, chicken & fish",
      "Orange Bay island beach entrance pass",
      "Water, tea, coffee and soft drinks all day",
    ],
    excluded: [
      "Underwater camera rental",
      "National park reef conservation tax ($5)",
      "Optional scuba intro dive",
    ],
    highlights: [
      "Explore two distinct coral reef drop-offs in the Red Sea.",
      "High chance of seeing wild dolphins and sea turtles.",
      "2 full hours relaxing on Orange Bay's picture-perfect beach.",
      "Delicious onboard catering prepared by cruise chefs.",
    ],
    testimonials: [
      {
        id: "t1",
        name: "Elena Rossi",
        location: "Italy",
        date: "14 Jun 2026",
        quote:
          "The coral gardens were out of this world! We saw rays, clownfish, and a turtle. 10/10 experience.",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
      },
    ],
  },
  {
    id: "red-sea-diving",
    slug: "red-sea-diving",
    title: "Red Sea Scuba Diving Experience",
    category: "Sea Trip",
    tripTypeTag: "Sea Trips",
    price: 45.0,
    priceFormatted: "$ 45.0 USA",
    adultPrice: 75,
    childPrice: 50,
    duration: "1 Full Day (8 Hours)",
    rating: 4.9,
    reviewCount: 220,
    reviewsSummaryCount: 380,
    ratingBreakdown: { 5: 90, 4: 40, 3: 20, 2: 10, 1: 0 },
    image: "/images/home/categories/diving.jpg",
    gallery: [
      "/images/home/Gallery/6ad7f35add4c0722da04a0431f5c2163 1.png",
      "/images/home/Gallery/Frame1171276589.png",
      "/images/home/Gallery/Frame1171276587.png",
      "/images/home/Gallery/Frame1171276593.png",
    ],
    description:
      "Discover the mesmerizing underwater world of the Red Sea. Whether you're a certified diver or trying scuba for the first time, experience two guided boat dives with professional PADI instructors at world-renowned dive spots.",
    location: "Hurghada",
    tourType: "Scuba Diving Tour",
    transportation: "Dedicated Diving Vessel",
    availability: "Daily",
    language: "English / German / French / Arabic",
    isBestSeller: false,
    included: [
      "Hotel pickup & drop-off",
      "Full scuba diving equipment (wetsuit, BCD, regulator, tanks)",
      "2 guided dives at different reef sites (approx. 20-30 min each)",
      "1-on-1 supervision for beginner intro divers",
      "Freshly prepared buffet lunch onboard",
      "Unlimited soft drinks, tea, and mineral water",
    ],
    excluded: [
      "Underwater photo & video service",
      "PADI certification fees (optional upgrade)",
      "Reef conservation fee ($5)",
    ],
    highlights: [
      "Dive at world-class coral walls and pinnacles in Hurghada.",
      "Beginner-friendly introductory dive with personal PADI instructor.",
      "Explore shipwrecks, coral gardens, and marine biodiversity.",
      "Relax on the spacious sun deck between dive sessions.",
    ],
    testimonials: [
      {
        id: "t1",
        name: "Lukas Weber",
        location: "Austria",
        date: "08 Jun 2026",
        quote:
          "My first time scuba diving and it was absolute perfection. Instructors were calm, patient, and professional.",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
      },
    ],
  },
  {
    id: "giza-pyramids-tour",
    slug: "giza-pyramids-tour",
    title: "Giza Pyramids & Sphinx Adventure",
    category: "Historical Trip",
    tripTypeTag: "Historical Trips",
    price: 55.0,
    priceFormatted: "$ 55.0 USA",
    adultPrice: 70,
    childPrice: 45,
    duration: "1 Full Day (8-10 Hours)",
    rating: 4.9,
    reviewCount: 512,
    reviewsSummaryCount: 890,
    ratingBreakdown: { 5: 92, 4: 50, 3: 20, 2: 10, 1: 5 },
    image: "/images/home/PopularDestinations/giza.png",
    gallery: [
      "/images/home/Blogs/afbce762e899ad363b746ae91fc0c11c35ac147d.jpg",
      "/images/home/PopularDestinations/aswan.png",
      "/images/home/Gallery/Frame1171276590.png",
      "/images/home/whereBegins/Frame 1171276613 (1).png",
    ],
    description:
      "Stand in awe before the last surviving wonder of the ancient world. Tour the Great Pyramids of Khufu, Khafre, and Menkaure, gaze at the enigmatic Great Sphinx, and explore ancient funerary temples with an Egyptologist guide.",
    location: "Giza",
    tourType: "Historical Tour",
    transportation: "Private Air-conditioned Coach",
    availability: "Daily",
    language: "English / Spanish / Arabic",
    isBestSeller: false,
    included: [
      "Hotel pickup and drop-off in Cairo or Giza",
      "Licensed expert Egyptologist tour guide",
      "Entry to the Giza Plateau area and Sphinx complex",
      "Panoramic desert photo stop overlooking all 3 pyramids",
      "Traditional Egyptian lunch at a restaurant with pyramid views",
      "Bottled water throughout the day",
    ],
    excluded: [
      "Entry ticket inside the Great Pyramid chamber",
      "Camel or horse carriage rides (available on site)",
      "Tips & personal souvenirs",
    ],
    highlights: [
      "Visit the Great Pyramid of Giza, Khufu's 4,500-year-old masterpiece.",
      "Get up close with the mythical Great Sphinx of Giza.",
      "Panoramic photo stop capturing all three pyramids aligned in the desert.",
      "Optional entry into ancient burial chambers and royal solar boats.",
    ],
    testimonials: [
      {
        id: "t1",
        name: "Chloe Bennett",
        location: "Canada",
        date: "22 Jun 2026",
        quote:
          "Seeing the Pyramids in real life exceeded every expectation. Our guide made the history come alive!",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80",
      },
    ],
  },
];

const bestSellingTours: Tour[] = tours.filter((t) => t.isBestSeller);

export function getTourBySlug(slug: string): Tour {
  const normalized = slug?.toLowerCase() || "";
  const found = tours.find(
    (t) =>
      t.slug.toLowerCase() === normalized ||
      t.id.toLowerCase() === normalized ||
      normalized.includes(t.slug.toLowerCase()) ||
      t.slug.toLowerCase().includes(normalized)
  );

  if (found) return found;

  // Specific fallbacks
  if (normalized.includes("luxor")) return tours[0];
  if (normalized.includes("island")) return tours[1];
  if (normalized.includes("safari") || normalized.includes("quad")) return tours[2];
  if (normalized.includes("snorkel") || normalized.includes("orange")) return tours[3];
  if (normalized.includes("div")) return tours[4];
  if (normalized.includes("giza") || normalized.includes("pyramid")) return tours[5];

  // Default to first tour (Luxor Day Tour)
  return tours[0];
}
