/** Shape returned by the API for a single trip type */
export interface TripType {
  id: number;
  name: string;
}

/** Localized name object used in create/update request bodies */
export interface TripTypeNameLocalized {
  en: string;
  fr: string;
  ru: string;
  ro: string;
}

/** Query parameters for the paginated GET /api/TripTypes endpoint */
export interface GetTripTypesParams {
  pageNumber?: number;
  pageSize?: number;
  lang?: string;
}

/** Generic API envelope used across all TripType endpoints */
export interface TripTypeApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
