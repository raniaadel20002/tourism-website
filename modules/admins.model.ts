/** Shape returned by the API for a single admin */
export interface Admin {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
  nationality: string;
  notes: string;
  createdAt: string;
}

/** Request body for POST /api/Admins */
export interface AdminCreateDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  password: string;
  notes: string;
}

/** Request body for PUT /api/Admins */
export interface AdminUpdateDto {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
}

/** Query parameters for GET /api/Admins */
export interface GetAdminsParams {
  pageNumber?: number;
  pageSize?: number;
}

/** Generic API envelope used across all Admin endpoints */
export interface AdminApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
