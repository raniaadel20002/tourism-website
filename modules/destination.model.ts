/** Shape returned by GET /api/Destinations and GET /api/Destinations/{id} */
export interface Destination {
  id: number;
  name: string | null;
  imageUrl: string | null;
  isFeatured: boolean;
  tripsCount: number;
}

/** Generic API envelope used across all Destination endpoints */
export interface DestinationApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
}

/** Query parameters for the paginated GET /api/Destinations endpoint */
export interface GetDestinationsParams {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  /** ISO 639-1 locale for the Accept-Language header, defaults to "en" */
  lang?: string;
}
