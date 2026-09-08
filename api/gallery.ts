import { API_BASE_URL } from "./apiConfig";
import {
  GalleryImageAPI,
  GalleryApiResponse,
} from "@/modules/gallery.model";

/** Build a full image URL from the relative path returned by the API */
export function buildImageUrl(imageUrl: string): string {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  return `${API_BASE_URL}/${imageUrl}`;
}

/** GET /api/Gallery/GetAllImages */
export async function getAllGalleryImages(): Promise<GalleryImageAPI[]> {
  const res = await fetch(`${API_BASE_URL}/api/Gallery/GetAllImages`, {
    headers: { accept: "text/plain" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch gallery images: ${res.status}`);
  }

  const json: GalleryApiResponse<GalleryImageAPI[]> = await res.json();

  if (!json.success) {
    throw new Error(json.message || "Failed to fetch gallery images");
  }

  return json.data;
}

/** GET /api/Gallery/GetImageById/{id} */
export async function getGalleryImageById(
  id: number
): Promise<GalleryImageAPI> {
  const res = await fetch(`${API_BASE_URL}/api/Gallery/GetImageById/${id}`, {
    headers: { accept: "text/plain" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch gallery image ${id}: ${res.status}`);
  }

  const json: GalleryApiResponse<GalleryImageAPI> = await res.json();

  if (!json.success) {
    throw new Error(json.message || `Failed to fetch gallery image ${id}`);
  }

  return json.data;
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

  const res = await fetch(`${API_BASE_URL}/api/Gallery/AddImage`, {
    method: "POST",
    headers: {
      accept: "text/plain",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Failed to add gallery image: ${res.status}`);
  }

  const json: GalleryApiResponse<GalleryImageAPI> = await res.json();

  if (!json.success) {
    throw new Error(json.message || "Failed to add gallery image");
  }

  return json.data;
}

/** DELETE /api/Gallery/DeleteImage/{id} — requires auth token */
export async function deleteGalleryImage(
  id: number,
  token: string
): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/Gallery/DeleteImage/${id}`, {
    method: "DELETE",
    headers: {
      accept: "text/plain",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to delete gallery image ${id}: ${res.status}`);
  }

  const json: GalleryApiResponse<string> = await res.json();

  if (!json.success) {
    throw new Error(json.message || `Failed to delete gallery image ${id}`);
  }
}
