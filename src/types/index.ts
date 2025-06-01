export interface Translation {
  id: string;
  sourceText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  timestamp: number;
}

export interface TranslationState {
  history: Translation[];
  isLoading: boolean;
  error: string | null;
  currentTranslation: Translation | null;
}

export interface Language {
  code: string;
  name: string;
}