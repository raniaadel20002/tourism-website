import type {
  Trip,
  TripApiResponse,
  TripMutation,
  TripImage,
  TranslationInput,
} from "@/modules/trip.model";
import { authFetch } from "@/utils/authFetch";

export type { Trip, TripMutation, TripImage, TranslationInput };

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

async function parse<T>(res: Response, action: string): Promise<T> {
  if (res.status === 401) {
    throw Object.assign(new Error("UNAUTHORIZED"), {
      isUnauthorized: true,
    });
  }

  if (!res.ok) {
    throw new Error(`${action}: ${res.status}`);
  }

  const json: TripApiResponse<T> = await res.json();

  if (!json.success) {
    throw new Error(json.message || action);
  }

  return json.data;
}

// ─── GET /api/Trips ───────────────────────────────────────────────────────────

export async function getTrips(
  token?: string,
  pageNumber = 1,
  pageSize = 100,
  params: Omit<GetTripsParams, "pageNumber" | "pageSize"> = {}
): Promise<Trip[]> {
  const q = new URLSearchParams();

  q.set("PageNumber", String(pageNumber));
  q.set("PageSize", String(pageSize));

  if (params.minPrice !== undefined) {
    q.set("MinPrice", String(params.minPrice));
  }

  if (params.maxPrice !== undefined) {
    q.set("MaxPrice", String(params.maxPrice));
  }

  if (params.typeId !== undefined) {
    q.set("TypeId", String(params.typeId));
  }

  if (params.destinationId !== undefined) {
    q.set("DestinationId", String(params.destinationId));
  }

  if (params.searchItem) {
    q.set("SearchItem", params.searchItem);
  }

  if (params.includeInactive !== undefined) {
    q.set("includeInactive", String(params.includeInactive));
  }

  const res = await authFetch(`/api/Trips?${q.toString()}`, {
    method: "GET",
    headers: params.lang
      ? { "Accept-Language": params.lang }
      : undefined,
  });

  return parse<Trip[]>(res, "Failed to fetch trips");
}

// ─── GET /api/Trips/{id} ──────────────────────────────────────────────────────

export async function getTripById(
  id: number,
  token?: string,
  lang = "en"
): Promise<Trip> {
  const res = await authFetch(`/api/Trips/${id}`, {
    method: "GET",
    headers: {
      "Accept-Language": lang,
    },
  });

  return parse<Trip>(res, "Failed to fetch trip");
}

// ─── GET /api/Trips/marker/{markerId} ─────────────────────────────────────────

export async function getTripByMarkerId(
  markerId: string,
  token?: string,
  lang = "en"
): Promise<Trip> {
  const res = await authFetch(
    `/api/Trips/marker/${encodeURIComponent(markerId)}`,
    {
      method: "GET",
      headers: {
        "Accept-Language": lang,
      },
    }
  );

  return parse<Trip>(
    res,
    `Failed to fetch trip with marker ${markerId}`
  );
}

// ─── GET /api/Trips/type/{typeId} ─────────────────────────────────────────────

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

  const res = await authFetch(
    `/api/Trips/type/${typeId}?${q.toString()}`,
    {
      method: "GET",
      headers: {
        "Accept-Language": lang,
      },
    }
  );

  return parse<Trip[]>(
    res,
    `Failed to fetch trips for type ${typeId}`
  );
}

// ─── POST /api/Trips ──────────────────────────────────────────────────────────

export async function createTrip(
  body: TripMutation,
  token: string
): Promise<Trip> {
  const res = await authFetch("/api/Trips", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return parse<Trip>(res, "Failed to create trip");
}

// ─── PUT /api/Trips ───────────────────────────────────────────────────────────

export async function updateTrip(
  id: number,
  body: TripMutation,
  token: string
): Promise<Trip> {
  const res = await authFetch("/api/Trips", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, ...body }),
  });

  return parse<Trip>(res, "Failed to update trip");
}

// ─── DELETE /api/Trips/{id}/deactivate ────────────────────────────────────────

export async function deactivateTrip(
  id: number,
  token: string
): Promise<void> {
  const res = await authFetch(`/api/Trips/${id}/deactivate`, {
    method: "DELETE",
  });

  await parse<string>(res, "Failed to deactivate trip");
}

// ─── PUT /api/Trips/{id}/reactivate ───────────────────────────────────────────

export async function reactivateTrip(
  id: number,
  token: string
): Promise<void> {
  const res = await authFetch(`/api/Trips/${id}/reactivate`, {
    method: "PUT",
  });

  await parse<string>(res, "Failed to reactivate trip");
}

// ─── POST /api/Trips/{id}/image ───────────────────────────────────────────────

export async function addTripImages(
  id: number,
  images: File[],
  token: string
): Promise<TripImageUpload[]> {
  const form = new FormData();

  images.forEach((img) => form.append("Images", img));

  const res = await authFetch(`/api/Trips/${id}/image`, {
    method: "POST",
    body: form,
  });

  return parse<TripImageUpload[]>(
    res,
    "Failed to upload trip images"
  );
}

/**
 * @deprecated Use addTripImages (plural) instead.
 */
export async function addTripImage(
  id: number,
  image: File,
  _isPrimary: boolean,
  token: string
): Promise<TripImageUpload> {
  const results = await addTripImages(id, [image], token);

  if (!results.length) {
    throw new Error("Image upload returned no results");
  }

  return results[0];
}

// ─── DELETE /api/Trips/{id}/image/{imageId} ───────────────────────────────────

export async function deleteTripImage(
  id: number,
  imageId: number,
  token: string
): Promise<void> {
  const res = await authFetch(
    `/api/Trips/${id}/image/${imageId}`,
    {
      method: "DELETE",
    }
  );

  await parse<string>(res, "Failed to delete trip image");
}

// ─── PUT /api/Trips/{id}/image/{imageId}/set-primary ─────────────────────────

export async function setPrimaryTripImage(
  id: number,
  imageId: number,
  token: string
): Promise<TripImage> {
  const res = await authFetch(
    `/api/Trips/${id}/image/${imageId}/set-primary`,
    {
      method: "PUT",
    }
  );

  return parse<TripImage>(
    res,
    "Failed to set primary image"
  );
}