import { API_BASE_URL } from "./apiConfig";
import type { FAQ, FAQApiResponse, FAQMutation } from "@/modules/faq.model";

export type { FAQ, FAQMutation };

const headers = (token?: string): HeadersInit => ({
  accept: "text/plain",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

async function parse<T>(res: Response, action: string): Promise<T> {
  if (!res.ok) throw new Error(`${action}: ${res.status}`);
  const json: FAQApiResponse<T> = await res.json();
  if (!json.success) throw new Error(json.message || action);
  return json.data;
}

export async function getFAQs(token?: string, pageNumber = 1, pageSize = 100) {
  return parse<FAQ[]>(
    await fetch(`${API_BASE_URL}/api/Questions?PageNumber=${pageNumber}&PageSize=${pageSize}`, {
      headers: headers(token),
      cache: "no-store",
    }),
    "Failed to fetch FAQs"
  );
}

export async function getFAQById(id: number, token?: string) {
  return parse<FAQ>(
    await fetch(`${API_BASE_URL}/api/Questions/${id}`, {
      headers: headers(token),
      cache: "no-store",
    }),
    "Failed to fetch FAQ"
  );
}

export async function createFAQ(body: FAQMutation, token: string) {
  return parse<FAQ>(
    await fetch(`${API_BASE_URL}/api/Questions`, {
      method: "POST",
      headers: { ...headers(token), "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
    "Failed to create FAQ"
  );
}

export async function updateFAQ(body: FAQMutation, token: string) {
  return parse<FAQ>(
    await fetch(`${API_BASE_URL}/api/Questions`, {
      method: "PUT",
      headers: { ...headers(token), "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
    "Failed to update FAQ"
  );
}

export async function deleteFAQ(id: number, token: string) {
  await parse<string>(
    await fetch(`${API_BASE_URL}/api/Questions/${id}`, {
      method: "DELETE",
      headers: headers(token),
    }),
    "Failed to delete FAQ"
  );
}
