import { API_BASE_URL } from "@/api/apiConfig";
import { refreshToken } from "@/api/auth";

let refreshPromise: Promise<string | null> | null = null;

function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_access_token");
}

function getStoredRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_refresh_token");
}

function clearAuth(): void {
  localStorage.removeItem("admin_access_token");
  localStorage.removeItem("admin_refresh_token");
  localStorage.removeItem("admin_role");
}

async function refreshAccessToken(): Promise<string | null> {
  const storedRefreshToken = getStoredRefreshToken();

  if (!storedRefreshToken) {
    clearAuth();
    return null;
  }

  try {
    const data = await refreshToken({
      refreshToken: storedRefreshToken,
    });

    // Backend returns "accesstoken"
    localStorage.setItem("admin_access_token", data.accesstoken);

    return data.accesstoken;
  } catch (error) {
    console.error("Token refresh failed:", error);
    clearAuth();
    return null;
  }
}

async function getNewAccessToken(): Promise<string | null> {
  // If another request is already refreshing,
  // wait for the same refresh request.
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = refreshAccessToken();

  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
}

export async function authFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const accessToken = getAccessToken();

  const headers = new Headers(options.headers);

  headers.set("Accept", "application/json");

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    cache: options.cache ?? "no-store",
  });

  // Access token expired → refresh → retry once
  if (response.status === 401 && accessToken) {
    const newAccessToken = await getNewAccessToken();

    if (!newAccessToken) {
      throw Object.assign(new Error("UNAUTHORIZED"), {
        isUnauthorized: true,
      });
    }

    const retryHeaders = new Headers(options.headers);

    retryHeaders.set("Accept", "application/json");
    retryHeaders.set("Authorization", `Bearer ${newAccessToken}`);

    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: retryHeaders,
      cache: options.cache ?? "no-store",
    });
  }

  return response;
}