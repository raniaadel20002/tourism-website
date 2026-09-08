/** Generic API envelope used across all Auth endpoints */
export interface AuthApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ─── Request types ─────────────────────────────────────────────────────────────

/** POST /api/Auth/login */
export interface LoginRequest {
  email: string;
  password: string;
}

/** POST /api/Auth/forgot-password */
export interface ForgotPasswordRequest {
  email: string;
}

/** POST /api/Auth/reset-password */
export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

/** POST /api/Auth/refresh */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/** POST /api/Auth/logout */
export interface LogoutRequest {
  refreshToken: string;
}

/** PUT /api/Auth/updatepassword/{adminid} */
export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

// ─── Response data types ───────────────────────────────────────────────────────

/** Data payload returned by POST /api/Auth/login */
export interface LoginResponseData {
  refreshToken: string;
  accessToken: string;
  role: string;
}

/** Data payload returned by POST /api/Auth/refresh */
export interface RefreshTokenResponseData {
  accesstoken: string;
}
