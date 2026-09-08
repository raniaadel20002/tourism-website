
export interface PromoCode {
  id: number;
  code: number;
  discountEuro: number | null;
  discountpercent: number | null;
  limited: number;
  tripId?: number ;
  tripName?: string;
  tripType?: string;
  priceForChild?: number;
  priceForAdult?: number;
  createdAt?: string;
  createdBy?: string;
  isActived?: boolean;
}

export interface PromoCodeMutation {
  discountEuro: number | null;
  discountpercent: number | null;
  limited: number;
  tripId?: number | null;
}

export interface PromoCodeCreateResponse {
  id: number;
  code: number;
}

export interface PromoCodeApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
