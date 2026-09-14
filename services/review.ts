import { authFetch } from "@/utils/authFetch";

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

async function parseResponse<T>(
  res: Response,
  action: string
): Promise<T> {
  if (res.status === 401) {
    throw Object.assign(new Error("UNAUTHORIZED"), {
      isUnauthorized: true,
    });
  }

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
  params: GetReviewsParams = {}
): Promise<Review[]> {
  const q = new URLSearchParams();

  if (params.PageNumber !== undefined) {
    q.set("PageNumber", String(params.PageNumber));
  }

  if (params.PageSize !== undefined) {
    q.set("PageSize", String(params.PageSize));
  }

  if (params.TripId !== undefined) {
    q.set("TripId", String(params.TripId));
  }

  const query = q.toString();

  const res = await authFetch(
    `/api/Reviews${query ? `?${query}` : ""}`,
    {
      method: "GET",
    }
  );

  return parseResponse<Review[]>(res, "Failed to fetch reviews");
}

export async function getReviewById(
  id: number
): Promise<Review> {
  const res = await authFetch(`/api/Reviews/${id}`, {
    method: "GET",
  });

  return parseResponse<Review>(res, "Failed to fetch review");
}

export async function createReview(
  body: CreateReviewRequest
): Promise<Review> {
  const res = await authFetch("/api/Reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return parseResponse<Review>(res, "Failed to create review");
}

export async function deleteReview(
  id: number  
): Promise<string> {
  const res = await authFetch(`/api/Reviews/${id}`, {
    method: "DELETE",
  });

  return parseResponse<string>(res, "Failed to delete review");
}

export async function getTripReviewAverage(
  tripId: number
): Promise<{
  averageRate: number;
  totalReviews: number;
}> {
  const res = await authFetch(
    `/api/Reviews/trip/${tripId}/average`,
    {
      method: "GET",
    }
  );

  return parseResponse<{
    averageRate: number;
    totalReviews: number;
  }>(res, "Failed to fetch review average");
}