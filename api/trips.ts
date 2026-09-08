import { API_BASE_URL } from "./apiConfig";
import type { Trip, TripApiResponse, TripMutation, TripImage } from "@/modules/trip.model";

export type { Trip, TripMutation, TripImage };

/** Shape returned by POST /api/Trips/{id}/image (no isPrimary field) */
export interface TripImageUpload {
  id: number;
  imageUrl: string;
}

/** Optional filters for GET /api/Trips */
export interface GetTripsParams {
  pageNumber?: number;
  pageSize?: number;
  minPrice?: number;
  maxPrice?: number;
  typeId?: number;
  destinationId?: number;
  searchItem?: string;
  includeInactive?: boolean;
  lang?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const headers = (token?: string, lang?: string): HeadersInit => ({
  accept: "text/plain",
  ...(lang ? { "Accept-Language": lang } : {}),
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

async function parse<T>(res: Response, action: string): Promise<T> {
  if (!res.ok) throw new Error(`${action}: ${res.status}`);
  const json: TripApiResponse<T> = await res.json();
  if (!json.success) throw new Error(json.message || action);
  return json.data;
}

// ─── GET /api/Trips ───────────────────────────────────────────────────────────

/**
 * GET /api/Trips
 * Supports: PageNumber, PageSize, MinPrice, MaxPrice, TypeId, DestinationId,
 *           SearchItem, includeInactive, Accept-Language
 */
export async function getTrips(
  token?: string,
  pageNumber = 1,
  pageSize = 100,
  params: Omit<GetTripsParams, "pageNumber" | "pageSize"> = {}
): Promise<Trip[]> {
  const q = new URLSearchParams();
  q.set("PageNumber", String(pageNumber));
  q.set("PageSize", String(pageSize));
  if (params.minPrice !== undefined) q.set("MinPrice", String(params.minPrice));
  if (params.maxPrice !== undefined) q.set("MaxPrice", String(params.maxPrice));
  if (params.typeId !== undefined) q.set("TypeId", String(params.typeId));
  if (params.destinationId !== undefined) q.set("DestinationId", String(params.destinationId));
  if (params.searchItem) q.set("SearchItem", params.searchItem);
  if (params.includeInactive !== undefined) q.set("includeInactive", String(params.includeInactive));

  return parse<Trip[]>(
    await fetch(`${API_BASE_URL}/api/Trips?${q}`, {
      headers: headers(token, params.lang),
      cache: "no-store",
    }),
    "Failed to fetch trips"
  );
}

// ─── GET /api/Trips/{id} ──────────────────────────────────────────────────────

/** GET /api/Trips/{id} — fetch a single trip by numeric ID */
export async function getTripById(id: number, token?: string, lang = "en"): Promise<Trip> {
  return parse<Trip>(
    await fetch(`${API_BASE_URL}/api/Trips/${id}`, {
      headers: headers(token, lang),
      cache: "no-store",
    }),
    "Failed to fetch trip"
  );
}

// ─── GET /api/Trips/marker/{markerId} ─────────────────────────────────────────

/** GET /api/Trips/marker/{markerId} — fetch a single trip by its marker ID */
export async function getTripByMarkerId(markerId: string, token?: string, lang = "en"): Promise<Trip> {
  return parse<Trip>(
    await fetch(`${API_BASE_URL}/api/Trips/marker/${encodeURIComponent(markerId)}`, {
      headers: headers(token, lang),
      cache: "no-store",
    }),
    `Failed to fetch trip with marker ${markerId}`
  );
}

// ─── GET /api/Trips/type/{typeId} ─────────────────────────────────────────────

/** GET /api/Trips/type/{typeId} — fetch trips filtered by trip type */
export async function getTripsByType(
  typeId: number,
  token?: string,
  pageNumber = 1,
  pageSize = 100,
  lang = "en"
): Promise<Trip[]> {
  const q = new URLSearchParams();
  q.set("PageNumber", String(pageNumber));
  q.set("PageSize", String(pageSize));

  return parse<Trip[]>(
    await fetch(`${API_BASE_URL}/api/Trips/type/${typeId}?${q}`, {
      headers: headers(token, lang),
      cache: "no-store",
    }),
    `Failed to fetch trips for type ${typeId}`
  );
}

// ─── POST /api/Trips ──────────────────────────────────────────────────────────

/** POST /api/Trips — create a new trip */
export async function createTrip(body: TripMutation, token: string): Promise<Trip> {
  return parse<Trip>(
    await fetch(`${API_BASE_URL}/api/Trips`, {
      method: "POST",
      headers: { ...headers(token), "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
    "Failed to create trip"
  );
}

// ─── PUT /api/Trips ───────────────────────────────────────────────────────────

/** PUT /api/Trips — update an existing trip (id must be included in body) */
export async function updateTrip(id: number, body: TripMutation, token: string): Promise<Trip> {
  return parse<Trip>(
    await fetch(`${API_BASE_URL}/api/Trips`, {
      method: "PUT",
      headers: { ...headers(token), "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...body }),
    }),
    "Failed to update trip"
  );
}

// ─── DELETE /api/Trips/{id}/deactivate ────────────────────────────────────────

/** DELETE /api/Trips/{id}/deactivate */
export async function deactivateTrip(id: number, token: string): Promise<void> {
  await parse<string>(
    await fetch(`${API_BASE_URL}/api/Trips/${id}/deactivate`, {
      method: "DELETE",
      headers: headers(token),
    }),
    "Failed to deactivate trip"
  );
}

// ─── PUT /api/Trips/{id}/reactivate ───────────────────────────────────────────

/** PUT /api/Trips/{id}/reactivate */
export async function reactivateTrip(id: number, token: string): Promise<void> {
  await parse<string>(
    await fetch(`${API_BASE_URL}/api/Trips/${id}/reactivate`, {
      method: "PUT",
      headers: headers(token),
    }),
    "Failed to reactivate trip"
  );
}

// ─── POST /api/Trips/{id}/image ───────────────────────────────────────────────

/**
 * POST /api/Trips/{id}/image
 * Uploads one or more images to a trip.
 * Field name: `Images` (array of files).
 * Returns the list of newly created image records.
 */
export async function addTripImages(
  id: number,
  images: File[],
  token: string
): Promise<TripImageUpload[]> {
  const form = new FormData();
  images.forEach((img) => form.append("Images", img));

  return parse<TripImageUpload[]>(
    await fetch(`${API_BASE_URL}/api/Trips/${id}/image`, {
      method: "POST",
      headers: headers(token),
      body: form,
    }),
    "Failed to upload trip images"
  );
}

/**
 * @deprecated Use addTripImages (plural) instead.
 * Kept for backward compatibility with existing callers.
 */
export async function addTripImage(
  id: number,
  image: File,
  _isPrimary: boolean,
  token: string
): Promise<TripImageUpload> {
  const results = await addTripImages(id, [image], token);
  if (!results.length) throw new Error("Image upload returned no results");
  return results[0];
}

// ─── DELETE /api/Trips/{id}/image/{imageId} ───────────────────────────────────

/** DELETE /api/Trips/{id}/image/{imageId} */
export async function deleteTripImage(id: number, imageId: number, token: string): Promise<void> {
  await parse<string>(
    await fetch(`${API_BASE_URL}/api/Trips/${id}/image/${imageId}`, {
      method: "DELETE",
      headers: headers(token),
    }),
    "Failed to delete trip image"
  );
}

// ─── PUT /api/Trips/{id}/image/{imageId}/set-primary ─────────────────────────

/** PUT /api/Trips/{id}/image/{imageId}/set-primary */
export async function setPrimaryTripImage(
  id: number,
  imageId: number,
  token: string
): Promise<TripImage> {
  return parse<TripImage>(
    await fetch(`${API_BASE_URL}/api/Trips/${id}/image/${imageId}/set-primary`, {
      method: "PUT",
      headers: headers(token),
    }),
    "Failed to set primary image"
  );
}
