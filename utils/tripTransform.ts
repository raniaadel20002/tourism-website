import { Trip as ApiTrip } from "@/api/trips";
import { Trip as UiTrip } from "@/data/trips";
import { buildImageUrl } from "@/api/gallery";

/**
 * Transform API Trip data to UI Trip format expected by TripCard
 */
export function transformApiTripToUi(apiTrip: ApiTrip): UiTrip {
  // Find the primary trip image; fall back to destination image; then to placeholder
  const rawPrimaryImage =
    apiTrip.images?.find(img => img.isPrimary)?.imageUrl ||
    apiTrip.images?.[0]?.imageUrl ||
    apiTrip.destinationInfo?.imageUrl ||
    null;
  const primaryImage = rawPrimaryImage
    ? buildImageUrl(rawPrimaryImage)
    : '/images/placeholder.jpg';
  
  // Create a slug from the trip name
  const slug = apiTrip.name
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || `trip-${apiTrip.id}`;
  
  return {
    id: String(apiTrip.id),
    slug: slug,
    title: apiTrip.name || 'Untitled Trip',
    category: apiTrip.tripTypeName || 'Tour',
    location: apiTrip.destinationInfo?.name || apiTrip.destination || '',
    destinationInfo: apiTrip.destinationInfo,
    image: primaryImage,
    rating: 4.5, // Default rating since API doesn't provide this yet
    reviewsCount: 0, // Default review count
    price: apiTrip.adultPrice,
    priceFormatted: `${apiTrip.adultPrice} ${apiTrip.currencyName || 'EUR'}`,
    tripTypeTag: apiTrip.tripTypeName || 'Tour',
  };
}

/**
 * Transform multiple API Trips to UI Trip format
 */
export function transformApiTripsToUi(apiTrips: ApiTrip[]): UiTrip[] {
  return apiTrips.map(transformApiTripToUi);
}
