import { API_BASE_URL } from "./apiConfig";
import {
  TripType,
  TripTypeNameLocalized,
  GetTripTypesParams,
  TripTypeApiResponse,
} from "@/modules/tripType.model";

// Re-export types so callers can import from one place if needed
export type { TripType, TripTypeNameLocalized, GetTripTypesParams };

// â”€â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function authHeaders(token?: string): HeadersInit {
  return {
    accept: "text/plain",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// â”€â”€â”€ API Functions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/** GET /api/TripTypes â€” list all trip types (paginated) */
export async function getTripTypes(
  token?: string,
  params: GetTripTypesParams = {}
): Promise<TripType[]> {
  const query = new URLSearchParams();
  if (params.pageNumber !== undefined)
    query.set("PageNumber", String(params.pageNumber));
  if (params.pageSize !== undefined)
    query.set("PageSize", String(params.pageSize));

  const url = `${API_BASE_URL}/api/TripTypes${query.size ? `?${query}` : ""}`;

  const res = await fetch(url, {
    headers: authHeaders(token),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch trip types: ${res.status}`);
  }

  const json: TripTypeApiResponse<TripType[]> = await res.json();

  if (!json.success) {
    throw new Error(json.message || "Failed to fetch trip types");
  }

  return json.data;
}

/** GET /api/TripTypes/{id} â€” get a single trip type */
export async function getTripTypeById(
  id: number,
  token: string
): Promise<TripType> {
  const res = await fetch(`${API_BASE_URL}/api/TripTypes/${id}`, {
    headers: authHeaders(token),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch trip type ${id}: ${res.status}`);
  }

  const json: TripTypeApiResponse<TripType> = await res.json();

  if (!json.success) {
    throw new Error(json.message || `Failed to fetch trip type ${id}`);
  }

  return json.data;
}

/** POST /api/TripTypes â€” create a new trip type */
export async function createTripType(
  name: TripTypeNameLocalized,
  token: string
): Promise<TripType> {
  const res = await fetch(`${API_BASE_URL}/api/TripTypes`, {
    method: "POST",
    headers: {
      ...authHeaders(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    throw new Error(`Failed to create trip type: ${res.status}`);
  }

  const json: TripTypeApiResponse<TripType> = await res.json();

  if (!json.success) {
    throw new Error(json.message || "Failed to create trip type");
  }

  return json.data;
}

/** PUT /api/TripTypes â€” update an existing trip type */
export async function updateTripType(
  id: number,
  name: TripTypeNameLocalized,
  token: string
): Promise<TripType> {
  const res = await fetch(`${API_BASE_URL}/api/TripTypes`, {
    method: "PUT",
    headers: {
      ...authHeaders(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, name }),
  });

  if (!res.ok) {
    throw new Error(`Failed to update trip type ${id}: ${res.status}`);
  }

  const json: TripTypeApiResponse<TripType> = await res.json();

  if (!json.success) {
    throw new Error(json.message || `Failed to update trip type ${id}`);
  }

  return json.data;
}

/** DELETE /api/TripTypes/{id} â€” delete a trip type */
export async function deleteTripType(
  id: number,
  token: string
): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/TripTypes/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });

  if (!res.ok) {
    throw new Error(`Failed to delete trip type ${id}: ${res.status}`);
  }

  const json: TripTypeApiResponse<string> = await res.json();

  if (!json.success) {
    throw new Error(json.message || `Failed to delete trip type ${id}`);
  }
}
