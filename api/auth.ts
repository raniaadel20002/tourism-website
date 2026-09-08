import { API_BASE_URL } from "./apiConfig";
import {
  AuthApiResponse,
  LoginRequest,
  LoginResponseData,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  RefreshTokenRequest,
  RefreshTokenResponseData,
  LogoutRequest,
  UpdatePasswordRequest,
} from "@/modules/auth";

// Re-export types so callers can import from one place if needed
export type {
  LoginRequest,
  LoginResponseData,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  RefreshTokenRequest,
  RefreshTokenResponseData,
  LogoutRequest,
  UpdatePasswordRequest,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const jsonHeaders: HeadersInit = {
  accept: "text/plain",
  "Content-Type": "application/json",
};

function authHeaders(token: string): HeadersInit {
  return {
    accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };
}

// ─── API Functions ────────────────────────────────────────────────────────────

/** POST /api/Auth/login */
export async function login(body: LoginRequest): Promise<LoginResponseData> {
  const res = await fetch(`${API_BASE_URL}/api/Auth/login`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Login failed: ${res.status}`);
  }

  const json: AuthApiResponse<LoginResponseData> = await res.json();

  if (!json.success) {
    throw new Error(json.message || "Login failed");
  }

  return json.data;
}

/** POST /api/Auth/forgot-password */
export async function forgotPassword(
  body: ForgotPasswordRequest
): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/Auth/forgot-password`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Forgot password request failed: ${res.status}`);
  }

  const json: AuthApiResponse<string> = await res.json();

  if (!json.success) {
    throw new Error(json.message || "Forgot password request failed");
  }
}

/** POST /api/Auth/reset-password */
export async function resetPassword(
  body: ResetPasswordRequest
): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/Auth/reset-password`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Reset password failed: ${res.status}`);
  }

  const json: AuthApiResponse<string> = await res.json();

  if (!json.success) {
    throw new Error(json.message || "Reset password failed");
  }
}

/** POST /api/Auth/refresh */
export async function refreshToken(
  body: RefreshTokenRequest
): Promise<RefreshTokenResponseData> {
  const res = await fetch(`${API_BASE_URL}/api/Auth/refresh`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Token refresh failed: ${res.status}`);
  }

  const json: AuthApiResponse<RefreshTokenResponseData> = await res.json();

  if (!json.success) {
    throw new Error(json.message || "Token refresh failed");
  }

  return json.data;
}

/** POST /api/Auth/logout */
export async function logout(body: LogoutRequest): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/Auth/logout`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Logout failed: ${res.status}`);
  }

  const json: AuthApiResponse<string> = await res.json();

  if (!json.success) {
    throw new Error(json.message || "Logout failed");
  }
}

/** PUT /api/Auth/updatepassword/{adminid} — requires auth token */
export async function updatePassword(
  adminId: number,
  body: UpdatePasswordRequest,
  token: string
): Promise<void> {
  const res = await fetch(
    `${API_BASE_URL}/api/Auth/updatepassword/${adminId}`,
    {
      method: "PUT",
      headers: {
        ...authHeaders(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    throw new Error(`Update password failed: ${res.status}`);
  }

  const json: AuthApiResponse<string> = await res.json();

  if (!json.success) {
    throw new Error(json.message || "Update password failed");
  }
}
