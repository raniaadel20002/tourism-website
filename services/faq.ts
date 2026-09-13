import type { FAQ, FAQApiResponse, FAQMutation } from "@/modules/faq.model";
import { authFetch } from "@/utils/authFetch";

export type { FAQ, FAQMutation };

async function parse<T>(res: Response, action: string): Promise<T> {
  if (res.status === 401) {
    throw Object.assign(new Error("UNAUTHORIZED"), {
      isUnauthorized: true,
    });
  }

  if (!res.ok) throw new Error(`${action}: ${res.status}`);

  const json: FAQApiResponse<T> = await res.json();

  if (!json.success) throw new Error(json.message || action);

  return json.data;
}

export async function getFAQs(
  token?: string,
  pageNumber = 1,
  pageSize = 100,
  lang?: string
): Promise<FAQ[]> {
  const params = new URLSearchParams({
    PageNumber: String(pageNumber),
    PageSize: String(pageSize),
  });

  const res = await authFetch(`/api/Questions?${params.toString()}`, {
    method: "GET",
    headers: lang ? { "Accept-Language": lang } : undefined,
  });

  return parse<FAQ[]>(res, "Failed to fetch FAQs");
}

export async function getFAQById(
  id: number,
  token?: string,
  lang = "en"
) {
  const res = await authFetch(`/api/Questions/${id}`, {
    method: "GET",
    headers: {
      "Accept-Language": lang,
    },
  });

  return parse<FAQ>(res, "Failed to fetch FAQ");
}

export async function createFAQ(body: FAQMutation, token: string) {
  const res = await authFetch("/api/Questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return parse<FAQ>(res, "Failed to create FAQ");
}

export async function updateFAQ(body: FAQMutation, token: string) {
  const res = await authFetch("/api/Questions", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return parse<FAQ>(res, "Failed to update FAQ");
}

export async function deleteFAQ(id: number, token: string) {
  const res = await authFetch(`/api/Questions/${id}`, {
    method: "DELETE",
  });

  await parse<string>(res, "Failed to delete FAQ");
}