import { API_BASE_URL } from "./apiConfig";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CreateBookingTrip {
  tripId: number;
  noAdult: number;
  noChild: number;
  leaveDate: string;
}

export interface CreateBookingRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  code: number;
  nationality: string;
  hotelName: string;
  roomNo: string;
  tripsBookings: CreateBookingTrip[];
}

export interface BookingTripDetail {
  id: number;
  tripId: number;
  title: string;
  priceForChild: number;
  priceForAdult: number;
  noAdult: number;
  noChild: number;
  leaveDate: string;
  subTotal: number;
}

export interface Booking {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  bookingDate: string;
  hotelName: string;
  roomNo: string;
  totalPrice: number;
  /** 0 = Pending, 1 = Confirmed, 2 = Finished, 3 = Cancelled */
  status: number;
  createdAt: string;
  tripsBookings: BookingTripDetail[];
}

export interface GetBookingsParams {
  PageNumber?: number;
  PageSize?: number;
  Nationality?: string;
  SearchItem?: string;
  Phone?: string;
  Date?: string;
  /** numeric status value */
  Status?: number;
  TripId?: number;
}

interface BookingApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function authHeaders(token: string, isJson: boolean = false): HeadersInit {
  return {
    accept: "text/plain",
    ...(isJson ? { "Content-Type": "application/json" } : {}),
    Authorization: `Bearer ${token}`,
  };
}

async function parseResponse<T>(
  res: Response,
  action: string
): Promise<T> {
  let text = "";
  try {
    text = await res.text();
  } catch {
    throw new Error(`${action} failed (${res.status}): could not read response body`);
  }

  let json: BookingApiResponse<T>;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`${action} failed (${res.status}). Response: ${text.slice(0, 100)}`);
  }

  if (!res.ok || !json.success) {
    throw new Error(
      json.message || `${action} failed (${res.status})`
    );
  }

  return json.data;
}

// ─── API Functions ────────────────────────────────────────────────────────────

/** GET /api/Bookings */
export async function getBookings(
  token: string,
  params: GetBookingsParams = {}
): Promise<Booking[]> {
  const q = new URLSearchParams();

  if (params.PageNumber !== undefined)
    q.set("PageNumber", String(params.PageNumber));
  if (params.PageSize !== undefined)
    q.set("PageSize", String(params.PageSize));
  if (params.Nationality) q.set("Nationality", params.Nationality);
  if (params.SearchItem) q.set("SearchItem", params.SearchItem);
  if (params.Phone) q.set("Phone", params.Phone);
  if (params.Date) q.set("Date", params.Date);
  if (params.Status !== undefined)
    q.set("Status", String(params.Status));
  if (params.TripId !== undefined)
    q.set("TripId", String(params.TripId));

  const queryString = q.toString();
  const url = queryString ? `${API_BASE_URL}/api/Bookings?${queryString}` : `${API_BASE_URL}/api/Bookings`;

  return parseResponse<Booking[]>(
    await fetch(url, {
      headers: authHeaders(token),
      cache: "no-store",
    }),
    "Failed to fetch bookings"
  );
}

/** GET /api/Bookings/{id} */
export async function getBookingById(
  id: number,
  token: string
): Promise<Booking> {
  return parseResponse<Booking>(
    await fetch(`${API_BASE_URL}/api/Bookings/${id}`, {
      headers: authHeaders(token),
      cache: "no-store",
    }),
    "Failed to fetch booking"
  );
}

/** POST /api/Bookings — requires auth token */
export async function createBooking(
  body: CreateBookingRequest,
  token: string
): Promise<Booking> {
  return parseResponse<Booking>(
    await fetch(`${API_BASE_URL}/api/Bookings`, {
      method: "POST",
      headers: authHeaders(token, true),
      body: JSON.stringify(body),
    }),
    "Failed to create booking"
  );
}

/** PUT /api/Bookings/confirm?id={id} */
export async function confirmBooking(
  id: number,
  token: string
): Promise<void> {
  const res = await fetch(
    `${API_BASE_URL}/api/Bookings/confirm?id=${id}`,
    {
      method: "PUT",
      headers: authHeaders(token, false),
    }
  );

  if (!res.ok) {
    let msg = `Confirm booking failed (${res.status})`;
    try {
      const json = await res.json();
      if (json.message) msg = json.message;
    } catch {
      // ignore parse errors
    }
    throw new Error(msg);
  }
}

/** PUT /api/Bookings/finish?id={id} */
export async function finishBooking(
  id: number,
  token: string
): Promise<void> {
  const res = await fetch(
    `${API_BASE_URL}/api/Bookings/finish?id=${id}`,
    {
      method: "PUT",
      headers: authHeaders(token),
    }
  );

  if (!res.ok) {
    let msg = `Finish booking failed (${res.status})`;
    try {
      const json = await res.json();
      if (json.message) msg = json.message;
    } catch {
      // ignore parse errors
    }
    throw new Error(msg);
  }
}

/** DELETE /api/Bookings/{id} */
export async function deleteBooking(
  id: number,
  token: string
): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/Bookings/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });

  if (!res.ok) {
    let msg = `Delete booking failed (${res.status})`;
    try {
      const json = await res.json();
      if (json.message) msg = json.message;
    } catch {
      // ignore parse errors
    }
    throw new Error(msg);
  }
}
