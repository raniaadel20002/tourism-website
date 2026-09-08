/** Shape returned by the API for a single gallery image */
export interface GalleryImageAPI {
  id: number;
  imageUrl: string;
  isFeatured: boolean;
}

/** UI-friendly Gallery representation derived from the API response. */
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  isFeatured: boolean;
}

/** Generic API envelope used across all Gallery endpoints */
export interface GalleryApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
