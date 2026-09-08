export interface TranslationInput {
  en: string;
  fr: string;
  ru: string;
  ro: string;
}

export interface FAQ {
  id: number;
  text: string;
  answer: string;
}

export interface FAQMutation {
  id?: number;
  text: TranslationInput;
  answer: TranslationInput;
}

export interface FAQApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
