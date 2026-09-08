import { API_BASE_URL } from "./apiConfig";
import {
  Admin,
  AdminCreateDto,
  AdminUpdateDto,
  GetAdminsParams,
  AdminApiResponse,
} from "@/modules/admins.model";

// Re-export types so callers can import from one place if needed
export type { Admin, AdminCreateDto, AdminUpdateDto, GetAdminsParams };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function authHeaders(token: string): HeadersInit {
  return {
    accept: "text/plain",
    Authorization: `Bearer ${token}`,
  };
}

// ─── API Functions ────────────────────────────────────────────────────────────

/** GET /api/Admins — list all admins (paginated) */
export async function getAdmins(
  token: string,
  params: GetAdminsParams = {}
): Promise<Admin[]> {
  const query = new URLSearchParams();
  if (params.pageNumber !== undefined)
    query.set("PageNumber", String(params.pageNumber));
  if (params.pageSize !== undefined)
    query.set("PageSize", String(params.pageSize));

  const url = `${API_BASE_URL}/api/Admins${query.size ? `?${query}` : ""}`;

  const res = await fetch(url, {
    headers: authHeaders(token),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch admins: ${res.status}`);
  }

  const json: AdminApiResponse<Admin[]> = await res.json();

  if (!json.success) {
    throw new Error(json.message || "Failed to fetch admins");
  }

  return json.data;
}

/** GET /api/Admins/{id} — get a single admin */
export async function getAdminById(
  id: number,
  token: string
): Promise<Admin> {
  const res = await fetch(`${API_BASE_URL}/api/Admins/${id}`, {
    headers: authHeaders(token),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch admin ${id}: ${res.status}`);
  }

  const json: AdminApiResponse<Admin> = await res.json();

  if (!json.success) {
    throw new Error(json.message || `Failed to fetch admin ${id}`);
  }

  return json.data;
}

/** POST /api/Admins — create a new admin */
export async function createAdmin(
  dto: AdminCreateDto,
  token: string
): Promise<Admin> {
  const res = await fetch(`${API_BASE_URL}/api/Admins`, {
    method: "POST",
    headers: {
      ...authHeaders(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok) {
    throw new Error(`Failed to create admin: ${res.status}`);
  }

  const json: AdminApiResponse<Admin> = await res.json();

  if (!json.success) {
    throw new Error(json.message || "Failed to create admin");
  }

  return json.data;
}

/** PUT /api/Admins — update an existing admin */
export async function updateAdmin(
  dto: AdminUpdateDto,
  token: string
): Promise<Admin> {
  const res = await fetch(`${API_BASE_URL}/api/Admins`, {
    method: "PUT",
    headers: {
      ...authHeaders(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok) {
    throw new Error(`Failed to update admin ${dto.id}: ${res.status}`);
  }

  const json: AdminApiResponse<Admin> = await res.json();

  if (!json.success) {
    throw new Error(json.message || `Failed to update admin ${dto.id}`);
  }

  return json.data;
}

/** DELETE /api/Admins/{id} — delete an admin */
export async function deleteAdmin(
  id: number,
  token: string
): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/Admins/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });

  if (!res.ok) {
    throw new Error(`Failed to delete admin ${id}: ${res.status}`);
  }

  const json: AdminApiResponse<string> = await res.json();

  if (!json.success) {
    throw new Error(json.message || `Failed to delete admin ${id}`);
  }
}
