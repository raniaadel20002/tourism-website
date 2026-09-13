import type {
  PromoCode,
  PromoCodeApiResponse,
  PromoCodeMutation,
  PromoCodeCreateResponse,
} from "@/modules/promoCode.model";
import { authFetch } from "@/utils/authFetch";

export type { PromoCode, PromoCodeMutation };

async function parse<T>(res: Response, action: string): Promise<T> {
  if (res.status === 401) {
    throw Object.assign(new Error("UNAUTHORIZED"), {
      isUnauthorized: true,
    });
  }

  if (!res.ok) {
    throw new Error(`${action}: ${res.status}`);
  }

  const json: PromoCodeApiResponse<T> = await res.json();

  if (!json.success) {
    throw new Error(json.message || action);
  }

  return json.data;
}

export async function getPromoCodes(
  token?: string,
  pageNumber = 1,
  pageSize = 100
) {
  const res = await authFetch(
    `/api/PromoCodes?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    {
      method: "GET",
    }
  );

  return parse<PromoCode[]>(res, "Failed to fetch promo codes");
}

export async function getNonRelatedTripPromoCodes(
  token?: string,
  pageNumber = 1,
  pageSize = 100
) {
  const res = await authFetch(
    `/api/PromoCodes/nonrelatedtrip?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    {
      method: "GET",
    }
  );

  return parse<PromoCode[]>(
    res,
    "Failed to fetch non-related trip promo codes"
  );
}

export async function getRelatedTripPromoCodes(
  token?: string,
  pageNumber = 1,
  pageSize = 100
) {
  const res = await authFetch(
    `/api/PromoCodes/relatedtrip?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    {
      method: "GET",
    }
  );

  return parse<PromoCode[]>(
    res,
    "Failed to fetch related trip promo codes"
  );
}

export async function getPromoCodeById(
  id: number,
  token?: string
) {
  const res = await authFetch(`/api/PromoCodes/${id}`, {
    method: "GET",
  });

  return parse<PromoCode>(res, "Failed to fetch promo code");
}

export async function getPromoCodeByCode(
  code: number,
  token?: string
) {
  const res = await authFetch(`/api/PromoCodes/code/${code}`, {
    method: "GET",
  });

  return parse<PromoCode>(
    res,
    "Failed to fetch promo code by code"
  );
}

export async function createPromoCode(
  body: PromoCodeMutation,
  token: string
) {
  const res = await authFetch("/api/PromoCodes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return parse<PromoCodeCreateResponse>(
    res,
    "Failed to create promo code"
  );
}