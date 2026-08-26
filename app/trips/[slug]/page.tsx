"use client";

import { useParams } from "next/navigation";
import { getTourBySlug } from "@/data/tours";
import { useCart } from "@/context/CartContext";
import {
  DEFAULT_GALLERY,
  DEFAULT_INCLUDED,
  DEFAULT_EXCLUDED,
  DEFAULT_HIGHLIGHTS,
  DEFAULT_FAQS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_RATING_BREAKDOWN,
} from "@/data/tripDefaults";

import Breadcrumb from "@/components/Breadcrumb";
import TripDetailGallery from "@/components/Trips/Detail/TripDetailGallery";
import TripDetailOverview from "@/components/Trips/Detail/TripDetailOverview";
import TripBookingCard from "@/components/Trips/Detail/TripBookingCard";
import TripInfoCard from "@/components/Trips/Detail/TripInfoCard";
import TripHighlightsAndFAQ from "@/components/Trips/Detail/TripHighlightsAndFAQ";
import TripReviews from "@/components/Trips/Detail/TripReviews";
import TripAddReview from "@/components/Trips/Detail/TripAddReview";

export default function TripDetailsPage() {
  const params = useParams();
  const slug =
    typeof params?.slug === "string"
      ? params.slug
      : Array.isArray(params?.slug)
      ? params.slug[0]
      : "";

  const tour = getTourBySlug(slug);
  const { openBookingModal } = useCart();

  // Resolve tour-specific data or fall back to defaults
  const galleryImages = tour.gallery?.length ? tour.gallery : DEFAULT_GALLERY;
  const testimonials = tour.testimonials?.length ? tour.testimonials : DEFAULT_TESTIMONIALS;

  return (
    <main className="min-h-screen bg-white flex flex-col overflow-x-clip">

      {/* ── Breadcrumb ───────────────────────────────────────────── */}
      <Breadcrumb
        className="pt-20 sm:pt-24"
        items={[
          { label: "Home", href: "/" },
          { label: "Trips", href: "/trips" },
          { label: "Trip details", activeColor: "text-[#006993]" },
        ]}
      />

      {/* ── Main Content ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 w-full flex-1 flex flex-col gap-10 sm:gap-12">

        {/* 1. Hero Gallery */}
        <TripDetailGallery
          mainImage={tour.image}
          title={tour.title}
          galleryImages={galleryImages}
        />

        {/* 2. Overview + Booking Card */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-12 w-full">
          <TripDetailOverview
            title={tour.title}
            description={tour.description}
            location={tour.location}
            rating={tour.rating}
            reviewCount={tour.reviewCount}
            groupSize={tour.groupSize || "2-15 Travellers"}
            duration={tour.duration}
            tourType={tour.tourType || tour.category}
            included={tour.included || DEFAULT_INCLUDED}
            excluded={tour.excluded || DEFAULT_EXCLUDED}
          />
          <TripBookingCard
            duration={tour.duration}
            adultPrice={tour.adultPrice || 65}
            childPrice={tour.childPrice || 40}
            onCheckAvailability={() => openBookingModal(tour)}
          />
        </div>

        {/* 3. Trip Info Card */}
        <TripInfoCard
          location={tour.location}
          duration={tour.duration}
          transportation={tour.transportation || "Air-conditioned Vehicle"}
          availability={tour.availability || "Daily"}
          language={tour.language || "English / Arabic"}
          groupSize={tour.groupSize || "2-15 Travellers"}
        />

        {/* 4. Highlights & FAQs */}
        <TripHighlightsAndFAQ
          highlights={tour.highlights || DEFAULT_HIGHLIGHTS}
          faqs={tour.faqs || DEFAULT_FAQS}
        />

        {/* 5. Reviews & Testimonials */}
        <TripReviews
          rating={tour.rating || 4.5}
          reviewsSummaryCount={tour.reviewsSummaryCount || 653}
          ratingBreakdown={tour.ratingBreakdown || DEFAULT_RATING_BREAKDOWN}
          testimonials={testimonials}
        />

        {/* 6. Add Review */}
        <TripAddReview />

      </div>
    </main>
  );
}
