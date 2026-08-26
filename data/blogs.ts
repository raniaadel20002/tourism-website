export interface BlogSection {
  id: string;
  heading: string;
  content: string;
}

export interface BlogComment {
  id: string;
  name: string;
  text: string;
}

export interface BlogItem {
  id: string;
  slug: string;
  date: string;
  author: string;
  tag: "Sea" | "Safari" | "History" | "Diving";
  title: string;
  heroTitle?: string;
  image: string;
  heroImage?: string;
  intro: string;
  sections: BlogSection[];
  toc: { id: string; label: string }[];
  comments: BlogComment[];
  commentsCount: number;
}

export const allBlogsData: BlogItem[] = [
  {
    id: "1",
    slug: "top-tours-hurghada-2026",
    date: "10, Jun 2026",
    author: "Admin",
    tag: "Sea",
    title: "Top Tours in Hurghada 2026",
    heroTitle: "Top Tours in Hurghada 2026: The Ultimate Travel Guide",
    image: "/images/home/Blogs/406065c289068fca584e70b62f59ca7257238059.jpg",
    heroImage: "/images/home/whereBegins/Frame 1171276613 (1).png",
    intro:
      "Hurghada remains Egypt's premier coastal hotspot for travelers seeking turquoise waters, pristine sandy islands, and exhilarating desert landscapes. In 2026, the resort city offers enhanced excursion options, eco-certified reef tours, and world-class hospitality for every traveler.",
    toc: [
      { id: "introduction", label: "Introduction" },
      { id: "must-visit-islands", label: "Must-Visit Islands" },
      { id: "snorkeling-safari", label: "Snorkeling & Safari Combo" },
      { id: "best-season", label: "Best Season to Visit" },
      { id: "practical-tips", label: "Practical Travel Tips" },
    ],
    sections: [
      {
        id: "must-visit-islands",
        heading: "Must-Visit Islands",
        content:
          "Orange Bay and Giftun Island are absolute musts on any Hurghada itinerary. Famous for shallow Caribbean-like crystal waters, wooden sunbeds, and tranquil swings in the sea, these island day trips offer the ultimate relaxation and photo opportunities.",
      },
      {
        id: "snorkeling-safari",
        heading: "Snorkeling & Safari Combo",
        content:
          "For travelers looking to make the most of their vacation, full-day combo adventures let you spend the morning snorkeling among pristine coral reefs and dolphins, followed by an afternoon quad biking across the golden desert dunes into a traditional Bedouin camp.",
      },
      {
        id: "best-season",
        heading: "Best Season to Visit",
        content:
          "Hurghada enjoys year-round sunshine. The spring (March to May) and autumn (September to November) months provide the perfect balance of warm sea temperatures and pleasant daytime breezes.",
      },
      {
        id: "practical-tips",
        heading: "Practical Travel Tips",
        content:
          "Book sea trips in advance, always pack biodegradable sunscreen to protect the coral reefs, bring an underwater camera, and carry Egyptian Pounds (EGP) for local tips and island refreshments.",
      },
    ],
    comments: [
      {
        id: "c1",
        name: "David M.",
        text: "The Orange Bay trip recommended here was the highlight of our family holiday in Hurghada! Fantastic guide and clear details.",
      },
    ],
    commentsCount: 25,
  },
  {
    id: "2",
    slug: "valley-of-the-kings",
    date: "10, Jun 2026",
    author: "Admin",
    tag: "History",
    title: "The Valley of the Kings",
    heroTitle: "The Valley of the Kings: Exploring Luxor's Ancient Royal Tombs",
    image: "/images/home/Blogs/afbce762e899ad363b746ae91fc0c11c35ac147d.jpg",
    heroImage: "/images/home/whereBegins/Frame 1171276613 (1).png",
    intro:
      "Nestled on the west bank of the Nile River opposite Luxor lies the Valley of the Kings, one of the world's most magnificent archaeological treasures. For over 500 years, ancient Egyptian pharaohs and nobles were laid to rest in elaborate rock-cut tombs adorned with vibrant sacred murals.",
    toc: [
      { id: "introduction", label: "Introduction" },
      { id: "historical-significance", label: "Historical Significance" },
      { id: "famous-tombs", label: "Famous Tombs to See" },
      { id: "best-visiting-hours", label: "Best Visiting Hours" },
      { id: "visitor-guidelines", label: "Visitor Guidelines" },
    ],
    sections: [
      {
        id: "historical-significance",
        heading: "Historical Significance",
        content:
          "During the New Kingdom period (1539–1075 BC), royal tombs were carved into the limestone hills of Luxor to protect pharaohs' treasures and eternal souls. Over 63 tombs have been unearthed, showcasing ancient Egyptian mythology and burial rituals in vivid detail.",
      },
      {
        id: "famous-tombs",
        heading: "Famous Tombs to See",
        content:
          "Standard tickets include entry to three open tombs on rotation (such as Ramesses IV, Ramesses IX, and Merenptah). Special ticket access is available for the legendary tomb of Tutankhamun (KV62) and the breathtaking chambers of Seti I (KV17).",
      },
      {
        id: "best-visiting-hours",
        heading: "Best Visiting Hours",
        content:
          "Arrive early in the morning (around 6:00 AM to 8:00 AM) to beat the desert heat and tourist crowds. The cool morning air allows you to fully appreciate the complex architecture and delicate hieroglyphs.",
      },
      {
        id: "visitor-guidelines",
        heading: "Visitor Guidelines",
        content:
          "Wear comfortable walking shoes, carry a reusable water bottle, hire a certified licensed Egyptologist guide, and never touch the ancient wall carvings to preserve these priceless relics for future generations.",
      },
    ],
    comments: [
      {
        id: "c2",
        name: "Sarah K.",
        text: "Visiting the tombs in Luxor was a lifelong dream. The colors inside look as if they were painted yesterday! Highly recommended read.",
      },
    ],
    commentsCount: 32,
  },
  {
    id: "3",
    slug: "how-to-choose-your-next-tour",
    date: "10, Jun 2026",
    author: "Admin",
    tag: "Sea",
    title: "How You Choose Your Next Tour?",
    heroTitle: "How to Choose Your Next Tour in Egypt: Tips & Recommendations",
    image: "/images/home/Blogs/36b1bda7b54e708ae1339161a16f910b0db436ae.jpg",
    heroImage: "/images/home/whereBegins/Frame 1171276613 (1).png",
    intro:
      "Egypt is a land of incredible diversity — from vibrant Red Sea coral reefs and endless Sahara dunes to millennia-old temples and scenic Nile cruises. Choosing the right tour depends on your travel style, budget, group size, and personal interests.",
    toc: [
      { id: "introduction", label: "Introduction" },
      { id: "identify-your-style", label: "Identify Your Style" },
      { id: "historical-vs-adventure", label: "Historical vs. Adventure" },
      { id: "budget-and-timing", label: "Budget & Timing" },
      { id: "booking-checklist", label: "Booking Checklist" },
    ],
    sections: [
      {
        id: "identify-your-style",
        heading: "Identify Your Travel Style",
        content:
          "Are you looking for serene beach relaxation, adrenaline-pumping quad biking, or an in-depth cultural exploration? Defining what excites you most will narrow down your search and ensure an unforgettable experience.",
      },
      {
        id: "historical-vs-adventure",
        heading: "Historical vs. Adventure Tours",
        content:
          "If ancient history fascinates you, day tours to Cairo (Pyramids & GEM) or Luxor (Karnak & Valley of the Kings) are unmatched. If you crave action and nature, prioritize snorkeling trips, scuba diving lessons, and desert safari camps.",
      },
      {
        id: "budget-and-timing",
        heading: "Budget & Timing Considerations",
        content:
          "Group excursions offer great affordability and lively social atmosphere, whereas private tours provide personalized flexibility and private transportation. Check what is included (meals, entrance fees, gear) when comparing prices.",
      },
      {
        id: "booking-checklist",
        heading: "Booking Checklist",
        content:
          "Verify customer reviews, check cancellation and reschedule flexibility, ensure English-speaking guides are provided, and confirm hotel pickup and drop-off logistics.",
      },
    ],
    comments: [
      {
        id: "c3",
        name: "Mark T.",
        text: "This breakdown made choosing between a private and group tour to Luxor so straightforward. Great practical advice!",
      },
    ],
    commentsCount: 19,
  },
  {
    id: "4",
    slug: "top-tours-hurghada-desert",
    date: "10, Jun 2026",
    author: "Admin",
    tag: "Safari",
    title: "Top Tours in Hurghada: Desert Safari Quad Adventure",
    heroTitle: "Desert Safari in Hurghada: The Ultimate Quad Biking Adventure",
    image: "/images/home/categories/DesertSafari.jpg",
    heroImage: "/images/home/whereBegins/Frame 1171276613 (1).png",
    intro:
      "Beyond Hurghada's coastal waters lies the vast, dramatic landscape of the Eastern Sahara desert. A desert quad biking safari gives you the thrilling chance to drive across rugged terrain, scale sand dunes, and experience authentic Bedouin culture under starry night skies.",
    toc: [
      { id: "introduction", label: "Introduction" },
      { id: "what-to-expect", label: "What to Expect" },
      { id: "bedouin-culture", label: "Bedouin Camp & Dinner" },
      { id: "what-to-wear", label: "What to Wear" },
      { id: "safety-guidelines", label: "Safety Guidelines" },
    ],
    sections: [
      {
        id: "what-to-expect",
        heading: "What to Expect",
        content:
          "Safaris typically begin with a safety briefing and test drive at the quad center. You'll then convoy across desert plains, navigate canyons, and stop at scenic viewpoints for breathtaking panoramic photos of the Red Sea mountains.",
      },
      {
        id: "bedouin-culture",
        heading: "Bedouin Camp & Dinner",
        content:
          "Most afternoon tours conclude at a traditional Bedouin tent where you can enjoy authentic herbal tea, freshly baked flatbread, camel rides, and a sunset barbecue accompanied by local folk music and stargazing.",
      },
      {
        id: "what-to-wear",
        heading: "What to Wear",
        content:
          "Wear long pants, comfortable closed-toe sneakers, sunglasses, and a traditional keffiyeh (headscarf) to protect your face and hair from desert sand and dust.",
      },
      {
        id: "safety-guidelines",
        heading: "Safety Guidelines",
        content:
          "Always follow the safari convoy leader, maintain a safe distance between ATVs, avoid reckless overtaking, and drink plenty of water throughout the trip.",
      },
    ],
    comments: [
      {
        id: "c4",
        name: "Elena R.",
        text: "The sunset in the desert was pure magic! Quad biking was exhilarating and the Bedouin dinner was delicious.",
      },
    ],
    commentsCount: 28,
  },
  {
    id: "5",
    slug: "giza-and-kings-valley",
    date: "10, Jun 2026",
    author: "Admin",
    tag: "History",
    title: "The Valley of the Kings & Giza Pyramids",
    heroTitle: "Ancient Wonders: Exploring Giza Pyramids & Valley of the Kings",
    image: "/images/home/PopularDestinations/giza.png",
    heroImage: "/images/home/whereBegins/Frame 1171276613 (1).png",
    intro:
      "No trip to Egypt is complete without standing before the Great Pyramids of Giza and exploring the subterranean royal tombs of Luxor. Together, these two iconic locations represent the pinnacle of ancient architectural mastery and spiritual devotion.",
    toc: [
      { id: "introduction", label: "Introduction" },
      { id: "giza-pyramids", label: "The Giza Plateau" },
      { id: "luxor-connection", label: "Connecting Cairo & Luxor" },
      { id: "planning-your-trip", label: "Planning Your Itinerary" },
      { id: "insider-tips", label: "Insider Travel Tips" },
    ],
    sections: [
      {
        id: "giza-pyramids",
        heading: "The Giza Plateau",
        content:
          "The Great Pyramid of Khufu is the only surviving ancient wonder of the world. Accompanied by the pyramids of Khafre and Menkaure, and guarded by the Great Sphinx, the Giza complex offers an awe-inspiring glimpse into 4,500 years of civilization.",
      },
      {
        id: "luxor-connection",
        heading: "Connecting Cairo & Luxor",
        content:
          "Travelers often combine both destinations via short 1-hour domestic flights or the scenic sleeper train along the Nile valley, experiencing both the Old Kingdom pyramid era and the New Kingdom imperial temples.",
      },
      {
        id: "planning-your-trip",
        heading: "Planning Your Itinerary",
        content:
          "Dedicate at least one full day to Cairo to visit the Pyramids, Sphinx, and Grand Egyptian Museum (GEM), followed by 2 to 3 days in Luxor for Karnak, Luxor Temple, and the West Bank tombs.",
      },
      {
        id: "insider-tips",
        heading: "Insider Travel Tips",
        content:
          "Purchase site passes online where available, hire an expert Egyptologist for in-depth storytelling, and take a felucca sailboat ride at sunset on the Nile to unwind.",
      },
    ],
    comments: [
      {
        id: "c5",
        name: "Alexander B.",
        text: "Combining Giza and Luxor was the highlight of our 10-day Egyptian adventure. Unbelievable history and beauty!",
      },
    ],
    commentsCount: 35,
  },
  {
    id: "6",
    slug: "snorkeling-and-choosing-tour",
    date: "12, Jan 2026",
    author: "Admin",
    tag: "Diving",
    title: "Everything You Need to Know Before Your First Scuba Diving Adventure",
    heroTitle: "Everything You Need to Know Before Your First Scuba Diving Adventure",
    image: "/images/home/Gallery/6ad7f35add4c0722da04a0431f5c2163 1.png",
    heroImage: "/images/home/whereBegins/Frame 1171276613 (1).png",
    intro:
      "Scuba diving is one of the most unforgettable experiences you can enjoy in Egypt. From colorful coral reefs to fascinating marine life, the Red Sea offers world-class diving destinations for beginners and experienced divers alike. Before you dive in, here's everything you need to know to make your adventure safe, exciting, and memorable.",
    toc: [
      { id: "introduction", label: "Introduction" },
      { id: "what-to-expect", label: "What to Expect" },
      { id: "what-to-bring", label: "What to Bring" },
      { id: "best-time-to-dive", label: "Best Time to Dive" },
      { id: "safety-tips", label: "Safety Tips" },
    ],
    sections: [
      {
        id: "what-to-expect",
        heading: "What to Expect",
        content:
          "Your diving experience usually begins with a short safety briefing and equipment introduction. Professional instructors will guide you through every step, ensuring you're comfortable before entering the water. Once underwater, you'll discover vibrant coral gardens, tropical fish, and breathtaking underwater landscapes.",
      },
      {
        id: "what-to-bring",
        heading: "What to Bring",
        content:
          "Pack lightweight clothing, swimwear, a towel, sunscreen, sunglasses, and a waterproof camera if you have one. Most diving operators provide all necessary diving equipment, including masks, fins, wetsuits, and oxygen tanks.",
      },
      {
        id: "best-time-to-dive",
        heading: "Best Time to Dive",
        content:
          "The Red Sea offers excellent diving conditions all year round. However, the best visibility is usually between March and November, when the water is warm and marine life is especially active.",
      },
      {
        id: "safety-tips",
        heading: "Safety Tips",
        content:
          "Always follow your instructor's guidance, check your equipment before entering the water, and never dive alone. Stay relaxed, breathe normally, and respect marine life by avoiding contact with corals or sea creatures.",
      },
    ],
    comments: [
      {
        id: "c6",
        name: "Emily R",
        text: "This guide answered all my questions before my first dive in Hurghada. The tips were clear, practical, and made me feel much more confident. I can't wait for my next underwater adventure!",
      },
    ],
    commentsCount: 25,
  },
];

export function getBlogPostBySlug(slug: string): BlogItem {
  const normalized = slug?.toLowerCase() || "";
  const found = allBlogsData.find(
    (b) =>
      b.slug.toLowerCase() === normalized ||
      b.id === normalized ||
      normalized.includes(b.slug.toLowerCase()) ||
      b.slug.toLowerCase().includes(normalized)
  );

  if (found) return found;

  // Fallback for special slugs like "scuba-diving" or "details"
  if (normalized.includes("scuba") || normalized.includes("diving") || normalized === "details") {
    return allBlogsData[5];
  }
  if (normalized.includes("luxor") || normalized.includes("king")) {
    return allBlogsData[1];
  }
  if (normalized.includes("safari") || normalized.includes("desert")) {
    return allBlogsData[3];
  }
  if (normalized.includes("choose") || normalized.includes("tour")) {
    return allBlogsData[2];
  }

  // Default to first blog
  return allBlogsData[0];
}
