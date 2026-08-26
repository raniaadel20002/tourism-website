/** Default fallback data for tour detail pages when tour-specific data is absent. */

export const DEFAULT_TESTIMONIALS = [
  {
    id: "t1",
    name: "Daniel Brown",
    location: "Australia",
    date: "12 Jun 2026",
    quote:
      "From the moment we arrived until the end of our tour, everything felt seamless. It was one of the best travel experiences we've ever had.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
  },
];

export const DEFAULT_GALLERY = [
  "/images/home/Blogs/afbce762e899ad363b746ae91fc0c11c35ac147d.jpg",
  "/images/home/Gallery/Frame1171276590.png",
  "/images/home/PopularDestinations/aswan.png",
  "/images/home/PopularDestinations/giza.png",
];

export const DEFAULT_INCLUDED = [
  "Hotel pickup & drop-off",
  "Professional Egyptologist guide",
  "Air-conditioned transportation",
  "Bottled water",
  "Entrance tickets (optional package)",
  "Lunch at a local restaurant (optional)",
];

export const DEFAULT_EXCLUDED = [
  "Personal expenses",
  "Tips & gratuities",
  "Optional activities",
];

export const DEFAULT_HIGHLIGHTS = [
  "Explore the magnificent Karnak Temple.",
  "Visit the legendary Valley of the Kings.",
  "Discover the Temple of Hatshepsut.",
  "Stop at the Colossi of Memnon.",
];

export const DEFAULT_FAQS = [
  {
    question: "Is this tour suitable for children?",
    answer: "Yes. The tour is family-friendly and suitable for travellers of all ages.",
  },
  {
    question: "What should I wear?",
    answer: "Comfortable clothing, walking shoes, and sun protection (hat and sunscreen).",
  },
  {
    question: "Does the tour include lunch?",
    answer: "Yes, a delicious lunch at an authentic local Egyptian restaurant is included.",
  },
];

export const DEFAULT_RATING_BREAKDOWN: Record<number, number> = {
  5: 80,
  4: 65,
  3: 40,
  2: 25,
  1: 10,
};
