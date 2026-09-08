import { API_BASE_URL } from "./apiConfig";

export interface Review {
  id: number;
  comment: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rate: number;
  createdAt: string;
  tripName: string;
  description: string;
  markerID: string;
  destination: string;
  tripTypeName: string;
  adultPrice: number;
  childPrice: number;
  currencyName: string;
}

export interface ReviewsResponse {
  success: boolean;
  message: string;
  data: Review[];
}

export interface CreateReviewRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tripId: number;
  comment: string;
  rate: number;
}

export interface GetReviewsParams {
  PageNumber?: number;
  PageSize?: number;
  TripId?: number;
}

function authHeaders(token?: string, isJson = false): HeadersInit {
  return {
    accept: "text/plain",
    ...(isJson ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function parseResponse<T>(
  res: Response,
  action: string
): Promise<T> {
  const text = await res.text();

  let json: {
    success: boolean;
    message: string;
    data: T;
  };

  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`${action} failed (${res.status})`);
  }

  if (!res.ok || !json.success) {
    throw new Error(json.message || `${action} failed (${res.status})`);
  }

  return json.data;
}

export async function getReviews(
  token?: string,
  params: GetReviewsParams = {}
): Promise<Review[]> {
  const q = new URLSearchParams();

  if (params.PageNumber !== undefined)
    q.set("PageNumber", String(params.PageNumber));

  if (params.PageSize !== undefined)
    q.set("PageSize", String(params.PageSize));

  if (params.TripId !== undefined)
    q.set("TripId", String(params.TripId));

  const query = q.toString();

  return parseResponse<Review[]>(
    await fetch(
      `${API_BASE_URL}/api/Reviews${query ? `?${query}` : ""}`,
      {
        headers: authHeaders(token),
        cache: "no-store",
      }
    ),
    "Failed to fetch reviews"
  );
}

export async function getReviewById(
  id: number,
  token?: string
): Promise<Review> {
  return parseResponse<Review>(
    await fetch(`${API_BASE_URL}/api/Reviews/${id}`, {
      headers: authHeaders(token),
      cache: "no-store",
    }),
    "Failed to fetch review"
  );
}

export async function createReview(
  body: CreateReviewRequest,
  token?: string
): Promise<Review> {
  return parseResponse<Review>(
    await fetch(`${API_BASE_URL}/api/Reviews`, {
      method: "POST",
      headers: authHeaders(token, true),
      body: JSON.stringify(body),
    }),
    "Failed to create review"
  );
}

export async function deleteReview(
  id: number,
  token: string
): Promise<string> {
  return parseResponse<string>(
    await fetch(`${API_BASE_URL}/api/Reviews/${id}`, {
      method: "DELETE",
      headers: authHeaders(token),
    }),
    "Failed to delete review"
  );
}

export async function getTripReviewAverage(
  tripId: number,
  token?: string
): Promise<{
  averageRate: number;
  totalReviews: number;
}> {
  return parseResponse(
    await fetch(
      `${API_BASE_URL}/api/Reviews/trip/${tripId}/average`,
      {
        headers: authHeaders(token),
        cache: "no-store",
      }
    ),
    "Failed to fetch review average"
  );
}