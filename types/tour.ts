export interface Tour {
  id: string;
  title: string;
  slug: string;
  category: string;
  tripTypeTag?: string;
  price: number;
  priceFormatted?: string;
  adultPrice?: number;
  childPrice?: number;
  duration: string;
  rating: number;
  reviewCount: number;
  reviewsSummaryCount?: number;
  ratingBreakdown?: { 
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  image: string;
  gallery?: string[];
  description: string;
  isBestSeller?: boolean;
  location: string;
  destinationInfo?: {
    id: number;
    name: string | null;
    imageUrl: string | null;
    isFeatured: boolean;
  } | null;
  tourType?: string;
  transportation?: string;
  availability?: string;
  language?: string;
  included?: string[];
  excluded?: string[];
  highlights?: string[];
  testimonials?: {
    id: string;
    name: string;
    location: string;
    date: string;
    quote: string;
    avatar: string;
  }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  tourCount: number;
}
