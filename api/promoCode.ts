import { API_BASE_URL } from "./apiConfig";
import type { PromoCode, PromoCodeApiResponse, PromoCodeMutation, PromoCodeCreateResponse } from "@/modules/promoCode.model";

export type { PromoCode, PromoCodeMutation };

const headers = (token?: string): HeadersInit => ({
  accept: "text/plain",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

async function parse<T>(res: Response, action: string): Promise<T> {
  if (!res.ok) throw new Error(`${action}: ${res.status}`);
  const json: PromoCodeApiResponse<T> = await res.json();
  if (!json.success) throw new Error(json.message || action);
  return json.data;
}

export async function getPromoCodes(token?: string, pageNumber = 1, pageSize = 100) {
  return parse<PromoCode[]>(
    await fetch(`${API_BASE_URL}/api/PromoCodes?PageNumber=${pageNumber}&PageSize=${pageSize}`, {
      headers: headers(token),
      cache: "no-store",
    }),
    "Failed to fetch promo codes"
  );
}

export async function getNonRelatedTripPromoCodes(token?: string, pageNumber = 1, pageSize = 100) {
  return parse<PromoCode[]>(
    await fetch(`${API_BASE_URL}/api/PromoCodes/nonrelatedtrip?PageNumber=${pageNumber}&PageSize=${pageSize}`, {
      headers: headers(token),
      cache: "no-store",
    }),
    "Failed to fetch non-related trip promo codes"
  );
}

export async function getRelatedTripPromoCodes(token?: string, pageNumber = 1, pageSize = 100) {
  return parse<PromoCode[]>(
    await fetch(`${API_BASE_URL}/api/PromoCodes/relatedtrip?PageNumber=${pageNumber}&PageSize=${pageSize}`, {
      headers: headers(token),
      cache: "no-store",
    }),
    "Failed to fetch related trip promo codes"
  );
}

export async function getPromoCodeById(id: number, token?: string) {
  return parse<PromoCode>(
    await fetch(`${API_BASE_URL}/api/PromoCodes/${id}`, {
      headers: headers(token),
      cache: "no-store",
    }),
    "Failed to fetch promo code"
  );
}


export async function getPromoCodeByCode(code: number, token?: string) {
  const res = await fetch(`${API_BASE_URL}/api/PromoCodes/code/${code}`, {
    headers: headers(token),
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();

    console.error("Promo Code API Error:", {
      status: res.status,
      body: errorText,
      code,
      hasToken: !!token,
    });

    throw new Error(`Failed to fetch promo code by code: ${res.status} - ${errorText}`);
  }

  const json: PromoCodeApiResponse<PromoCode> = await res.json();

  if (!json.success) {
    throw new Error(json.message || "Failed to fetch promo code by code");
  }

  return json.data;
}




export async function createPromoCode(
  body: PromoCodeMutation,
  token: string
) {
  const res = await fetch(`${API_BASE_URL}/api/PromoCodes`, {
    method: "POST",
    headers: {
      ...headers(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();

    console.error("PromoCode create failed:", {
      status: res.status,
      body,
      response: errorText,
    });

    throw new Error(
      `Failed to create promo code: ${res.status} - ${errorText}`
    );
  }

  const json: PromoCodeApiResponse<PromoCodeCreateResponse> =
    await res.json();

  if (!json.success) {
    throw new Error(json.message || "Failed to create promo code");
  }

  return json.data;
}


