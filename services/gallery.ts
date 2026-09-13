import { API_BASE_URL } from "./apiConfig";
import {
  GalleryImageAPI,
  GalleryApiResponse,
} from "@/modules/gallery.model";
import { authFetch } from "@/utils/authFetch";

/** Build a full image URL from the relative path returned by the API */
export function buildImageUrl(imageUrl: string): string {
  if (!imageUrl) return "";

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  return `${API_BASE_URL}/${imageUrl}`;
}

async function parse<T>(res: Response, action: string): Promise<T> {
  if (res.status === 401) {
    throw Object.assign(new Error("UNAUTHORIZED"), {
      isUnauthorized: true,
    });
  }

  if (!res.ok) {
    throw new Error(`${action}: ${res.status}`);
  }

  const json: GalleryApiResponse<T> = await res.json();

  if (!json.success) {
    throw new Error(json.message || action);
  }

  return json.data;
}

/** GET /api/Gallery/GetAllImages */
export async function getAllGalleryImages(): Promise<GalleryImageAPI[]> {
  const res = await authFetch("/api/Gallery/GetAllImages", {
    method: "GET",
  });

  return parse<GalleryImageAPI[]>(
    res,
    "Failed to fetch gallery images"
  );
}

/** GET /api/Gallery/GetImageById/{id} */
export async function getGalleryImageById(
  id: number
): Promise<GalleryImageAPI> {
  const res = await authFetch(`/api/Gallery/GetImageById/${id}`, {
    method: "GET",
  });

  return parse<GalleryImageAPI>(
    res,
    `Failed to fetch gallery image ${id}`
  );
}

/** POST /api/Gallery/AddImage — requires auth token */
export async function addGalleryImage(
  imageFile: File,
  isFeatured: boolean,
  token: string
): Promise<GalleryImageAPI> {
  const formData = new FormData();

  formData.append("ImageFile", imageFile);
  formData.append("IsFeatured", String(isFeatured));

  const res = await authFetch("/api/Gallery/AddImage", {
    method: "POST",
    body: formData,
  });

  return parse<GalleryImageAPI>(
    res,
    "Failed to add gallery image"
  );
}

/** DELETE /api/Gallery/DeleteImage/{id} — requires auth token */
export async function deleteGalleryImage(
  id: number,
  token: string
): Promise<void> {
  const res = await authFetch(`/api/Gallery/DeleteImage/${id}`, {
    method: "DELETE",
  });

  await parse<string>(
    res,
    `Failed to delete gallery image ${id}`
  );
}