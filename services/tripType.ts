import {
  TripType,
  TripTypeNameLocalized,
  GetTripTypesParams,
  TripTypeApiResponse,
} from "@/modules/tripType.model";
import { authFetch } from "@/utils/authFetch";

// Re-export types so callers can import from one place if needed
export type { TripType, TripTypeNameLocalized, GetTripTypesParams };

async function parse<T>(
  res: Response,
  action: string
): Promise<T> {
  if (res.status === 401) {
    throw Object.assign(new Error("UNAUTHORIZED"), {
      isUnauthorized: true,
    });
  }

  if (!res.ok) {
    throw new Error(`${action}: ${res.status}`);
  }

  const json: TripTypeApiResponse<T> = await res.json();

  if (!json.success) {
    throw new Error(json.message || action);
  }

  return json.data;
}

/** GET /api/TripTypes — list all trip types (paginated) */
export async function getTripTypes(
  token?: string,
  params: GetTripTypesParams = {}
): Promise<TripType[]> {
  const query = new URLSearchParams();

  if (params.pageNumber !== undefined) {
    query.set("PageNumber", String(params.pageNumber));
  }

  if (params.pageSize !== undefined) {
    query.set("PageSize", String(params.pageSize));
  }

  const queryString = query.toString();

  const res = await authFetch(
    `/api/TripTypes${queryString ? `?${queryString}` : ""}`,
    {
      method: "GET",
      headers: params.lang
        ? { "Accept-Language": params.lang }
        : undefined,
    }
  );

  return parse<TripType[]>(res, "Failed to fetch trip types");
}

/** GET /api/TripTypes/{id} — get a single trip type */
export async function getTripTypeById(
  id: number,
  token: string,
  lang = "en"
): Promise<TripType> {
  const res = await authFetch(`/api/TripTypes/${id}`, {
    method: "GET",
    headers: {
      "Accept-Language": lang,
    },
  });

  return parse<TripType>(
    res,
    `Failed to fetch trip type ${id}`
  );
}

/** POST /api/TripTypes — create a new trip type */
export async function createTripType(
  name: TripTypeNameLocalized,
  token: string
): Promise<TripType> {
  const res = await authFetch("/api/TripTypes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  return parse<TripType>(
    res,
    "Failed to create trip type"
  );
}

/** PUT /api/TripTypes — update an existing trip type */
export async function updateTripType(
  id: number,
  name: TripTypeNameLocalized,
  token: string
): Promise<TripType> {
  const res = await authFetch("/api/TripTypes", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, name }),
  });

  return parse<TripType>(
    res,
    `Failed to update trip type ${id}`
  );
}

/** DELETE /api/TripTypes/{id} — delete a trip type */
export async function deleteTripType(
  id: number,
  token: string
): Promise<void> {
  const res = await authFetch(`/api/TripTypes/${id}`, {
    method: "DELETE",
  });

  await parse<string>(
    res,
    `Failed to delete trip type ${id}`
  );
}