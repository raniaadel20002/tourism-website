import { API_BASE_URL } from "./apiConfig";
import type {
  Destination,
  DestinationApiResponse,
  GetDestinationsParams,
} from "@/modules/destination.model";

export type { Destination, GetDestinationsParams };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function authHeaders(token?: string, lang = "en"): HeadersInit {
  return {
    accept: "text/plain",
    "Accept-Language": lang,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function parse<T>(res: Response, action: string): Promise<T> {
  if (!res.ok) throw new Error(`${action}: ${res.status}`);
  const json: DestinationApiResponse<T> = await res.json();
  if (!json.success) throw new Error(json.message || action);
  return json.data;
}

// ─── API Functions ────────────────────────────────────────────────────────────

/** GET /api/Destinations — list destinations (paginated, optional search) */
export async function getDestinations(
  token?: string,
  params: GetDestinationsParams = {}
): Promise<Destination[]> {
  const query = new URLSearchParams();
  if (params.pageNumber !== undefined)
    query.set("PageNumber", String(params.pageNumber));
  if (params.pageSize !== undefined)
    query.set("PageSize", String(params.pageSize));
  if (params.searchTerm) query.set("searchTerm", params.searchTerm);

  const url = `${API_BASE_URL}/api/Destinations${query.size ? `?${query}` : ""}`;

  const res = await fetch(url, {
    headers: authHeaders(token, params.lang ?? "en"),
    cache: "no-store",
  });

  return parse<Destination[]>(res, "Failed to fetch destinations");
}

/** GET /api/Destinations/{id} — get a single destination */
export async function getDestinationById(
  id: number,
  token?: string,
  lang = "en"
): Promise<Destination> {
  const res = await fetch(`${API_BASE_URL}/api/Destinations/${id}`, {
    headers: authHeaders(token, lang),
    cache: "no-store",
  });
  return parse<Destination>(res, `Failed to fetch destination ${id}`);
}

/** POST /api/Destinations — create a destination (multipart/form-data) */
export async function createDestination(
  data: {
    nameEn: string;
    nameFr: string;
    nameRu: string;
    nameRo: string;
    isFeatured: boolean;
    imageFile?: File | null;
  },
  token: string
): Promise<Destination> {
  const form = new FormData();
  form.append("Name.En", data.nameEn);
  form.append("Name.Fr", data.nameFr);
  form.append("Name.Ru", data.nameRu);
  form.append("Name.Ro", data.nameRo);
  form.append("IsFeatured", String(data.isFeatured));
  if (data.imageFile) form.append("imageFile", data.imageFile);

  const res = await fetch(`${API_BASE_URL}/api/Destinations`, {
    method: "POST",
    headers: {
      accept: "text/plain",
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });

  return parse<Destination>(res, "Failed to create destination");
}

/** PUT /api/Destinations — update a destination (multipart/form-data) */
export async function updateDestination(
  data: {
    id: number;
    nameEn: string;
    nameFr: string;
    nameRu: string;
    nameRo: string;
    isFeatured: boolean;
    imageFile?: File | null;
  },
  token: string
): Promise<Destination> {
  const form = new FormData();
  form.append("Id", String(data.id));
  form.append("Name.En", data.nameEn);
  form.append("Name.Fr", data.nameFr);
  form.append("Name.Ru", data.nameRu);
  form.append("Name.Ro", data.nameRo);
  form.append("IsFeatured", String(data.isFeatured));
  if (data.imageFile) form.append("imageFile", data.imageFile);

  const res = await fetch(`${API_BASE_URL}/api/Destinations`, {
    method: "PUT",
    headers: {
      accept: "text/plain",
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });

  return parse<Destination>(res, `Failed to update destination ${data.id}`);
}

/** DELETE /api/Destinations/{id} — delete a destination */
export async function deleteDestination(
  id: number,
  token: string
): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/Destinations/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  await parse<string>(res, `Failed to delete destination ${id}`);
}

/** PUT /api/Destinations/{id}/image — replace only the image */
export async function updateDestinationImage(
  id: number,
  imageFile: File,
  token: string
): Promise<Destination> {
  const form = new FormData();
  form.append("imageFile", imageFile);

  const res = await fetch(`${API_BASE_URL}/api/Destinations/${id}/image`, {
    method: "PUT",
    headers: {
      accept: "text/plain",
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });

  return parse<Destination>(res, `Failed to update image for destination ${id}`);
}

/** DELETE /api/Destinations/{id}/image — remove the image */
export async function deleteDestinationImage(
  id: number,
  token: string
): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/Destinations/${id}/image`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  await parse<string>(res, `Failed to delete image for destination ${id}`);
}
