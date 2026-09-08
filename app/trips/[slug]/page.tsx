"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { getTrips, type Trip as ApiTrip } from "@/api/trips";
import { buildImageUrl } from "@/api/gallery";
import {
  getReviews,
  getTripReviewAverage,
  createReview,
  type Review,
} from "@/api/review";
import { useCart } from "@/context/CartContext";

import Breadcrumb from "@/components/Breadcrumb";
import TripDetailGallery from "@/components/Trips/Detail/TripDetailGallery";
import TripDetailOverview from "@/components/Trips/Detail/TripDetailOverview";
import TripBookingCard from "@/components/Trips/Detail/TripBookingCard";
import TripInfoCard from "@/components/Trips/Detail/TripInfoCard";
import TripHighlightsAndFAQ from "@/components/Trips/Detail/TripHighlightsAndFAQ";
import TripReviews from "@/components/Trips/Detail/TripReviews";
import TripAddReview from "@/components/Trips/Detail/TripAddReview";

import { useLanguage } from "@/context/LanguageContext";

export default function TripDetailsPage() {
  const { t } = useLanguage();
  const params = useParams();

  const slug =
    typeof params?.slug === "string"
      ? params.slug
      : Array.isArray(params?.slug)
        ? params.slug[0]
        : "";

  const [trip, setTrip] = useState<ApiTrip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewAverage, setReviewAverage] = useState(0);
  const [reviewTotalCount, setReviewTotalCount] = useState(0);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewError, setReviewError] = useState<string | null>(null);

  const { openBookingModal } = useCart();

  // Fetch all trips and find the one matching the slug
  useEffect(() => {
    async function fetchTrip() {
      try {
        setLoading(true);

        const trips = await getTrips(undefined, 1, 100);

        const foundTrip = trips.find((t) => {
          const tripSlug = t.name
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

          return tripSlug === slug || String(t.id) === slug;
        });

        if (foundTrip && foundTrip.isActive) {
          setTrip(foundTrip);
          setError(null);
        } else {
          setError("Trip not found");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch trip"
        );
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchTrip();
    }
  }, [slug]);

  // Fetch reviews for the current trip
  const fetchReviews = useCallback(async () => {
    if (!trip?.id) return;

    try {
      setReviewsLoading(true);
      setReviewError(null);

      const [reviewsData, averageData] = await Promise.all([
        getReviews(undefined, {
          PageNumber: 1,
          PageSize: 100,
          TripId: trip.id,
        }),
        getTripReviewAverage(trip.id),
      ]);

      setReviews(reviewsData || []);
      setReviewAverage(averageData?.averageRate ?? 0);
      setReviewTotalCount(averageData?.totalReviews ?? 0);
    } catch (err) {
      setReviews([]);
      setReviewAverage(0);
      setReviewTotalCount(0);
      setReviewError(
        err instanceof Error ? err.message : "Failed to fetch reviews"
      );
    } finally {
      setReviewsLoading(false);
    }
  }, [trip?.id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#006993] border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading trip details...</p>
        </div>
      </main>
    );
  }

  if (error || !trip) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {error || "Trip not found"}
          </p>

          <a
            href="/trips"
            className="px-6 py-2 bg-[#006993] text-white rounded-lg hover:bg-[#004560] inline-block"
          >
            Back to Trips
          </a>
        </div>
      </main>
    );
  }

  // Build primary image from API data only
  const rawPrimary =
    trip.images?.find((img) => img.isPrimary)?.imageUrl ||
    trip.images?.[0]?.imageUrl ||
    trip.destinationInfo?.imageUrl ||
    null;

  const primaryImage = rawPrimary ? buildImageUrl(rawPrimary) : "";

  // Gallery images from API only
  const galleryImages =
    trip.images
      ?.map((img) =>
        img.imageUrl ? buildImageUrl(img.imageUrl) : ""
      )
      .filter(Boolean) ?? [];

  // Trip data from API only
  const highlights = trip.highlights ?? [];
  const included = trip.includes ?? [];
  const excluded = trip.excludes ?? [];

  // Calculate rating breakdown from real reviews
  const ratingBreakdown: Record<number, number> = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  reviews.forEach((review) => {
    const star = Math.round(review.rate);

    if (star >= 1 && star <= 5) {
      ratingBreakdown[star] += 1;
    }
  });

  if (reviews.length > 0) {
    Object.keys(ratingBreakdown).forEach((star) => {
      const starNumber = Number(star);

      ratingBreakdown[starNumber] =
        (ratingBreakdown[starNumber] / reviews.length) * 100;
    });
  }

  // Convert API reviews to the format expected by TripReviews
  const testimonials = reviews.map((review) => ({
    id: String(review.id),
    name:
      `${review.firstName || ""} ${review.lastName || ""}`.trim() ||
      "Anonymous",
    location:
      review.destination || review.tripName || "",
    date: review.createdAt
      ? new Date(review.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      : "",
    quote: review.comment || "",
  }));

  const currentRating = Number(reviewAverage.toFixed(1));

  // Handle creating a new review
  const handleReviewSubmit = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    rating: number;
    comment: string;
  }) => {
    await createReview({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      tripId: trip.id,
      comment: data.comment,
      rate: data.rating,
    });

    await fetchReviews();
  };

  // Booking data from API only
  const tourForBooking = {
    id: trip.id,
    slug: slug,
    title: trip.name || "",
    image: primaryImage,
    location:
      trip.destinationInfo?.name ||
      trip.destination ||
      "",
    duration: `${trip.durationValue} ${trip.durationTypeName || ""
      }`,
    category: trip.tripTypeName || "",
    rating: currentRating,
    reviewCount: reviewTotalCount,
    price: trip.adultPrice,
    priceFormatted: `${trip.adultPrice} ${trip.currencyName || ""
      }`,
    adultPrice: trip.adultPrice,
    childPrice: trip.childPrice,
    description: trip.description || "",
    availableDays: trip.availableDays ?? [],
  };

  return (
    <main className="min-h-screen bg-white flex flex-col overflow-x-clip">
      {/* Breadcrumb */}
      <Breadcrumb
        className="pt-20 sm:pt-24"
        items={[
          {
            label: t("nav.home", "Home"),
            href: "/",
          },
          {
            label: t("nav.trips", "Trips"),
            href: "/trips",
          },
          {
            label: t("trips.tripDetails", "Trip details"),
            activeColor: "text-[#006993]",
          },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 w-full flex-1 flex flex-col gap-10 sm:gap-12">

        {/* 1. Hero Gallery */}
        <TripDetailGallery
          mainImage={primaryImage}
          title={trip.name || ""}
          galleryImages={galleryImages}
        />

        {/* 2. Overview + Booking Card */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-12 w-full">
          <TripDetailOverview
            title={trip.name || ""}
            description={trip.description || ""}
            location={
              trip.destinationInfo?.name ||
              trip.destination ||
              ""
            }
            rating={currentRating}
            reviewCount={reviewTotalCount}            
            duration={`${trip.durationValue} ${trip.durationTypeName || ""
              }`}
            tourType={trip.tripTypeName || ""}
            included={included}
            excluded={excluded}
          />

          <TripBookingCard
            duration={`${trip.durationValue} ${trip.durationTypeName || ""
              }`}
            adultPrice={trip.adultPrice}
            childPrice={trip.childPrice}
            onCheckAvailability={() =>
              openBookingModal(tourForBooking)
            }
          />
        </div>

        {/* 3. Trip Info Card */}
        <TripInfoCard
          location={
            trip.destinationInfo?.name ||
            trip.destination ||
            ""
          }
          duration={`${trip.durationValue} ${trip.durationTypeName || ""
            }`}
          availability={
            trip.availableDays?.length === 7
              ? "Daily"
              : trip.availableDays?.join(", ") || ""
          }
        />

        {/* 4. Highlights */}
        <TripHighlightsAndFAQ
          highlights={highlights}
        />

        {/* 5. Reviews & Testimonials */}
        {reviewsLoading ? (
          <div className="w-full py-10 text-center text-gray-500 font-roboto">
            Loading reviews...
          </div>
        ) : reviewError ? (
          <div className="w-full py-10 text-center text-red-500 font-roboto">
            {reviewError}
          </div>
        ) : (
          <TripReviews
            rating={currentRating}
            reviewsSummaryCount={reviewTotalCount}
            ratingBreakdown={ratingBreakdown}
            testimonials={testimonials}
          />
        )}

        {/* 6. Add Review */}
        <TripAddReview
          tripId={trip.id}
          onSubmit={handleReviewSubmit}
        />
      </div>
    </main>
  );
}