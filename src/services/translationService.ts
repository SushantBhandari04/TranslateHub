import axios from 'axios';

const API_URL = 'https://api.mymemory.translated.net/get';

interface TranslateParams {
  sourceText: string;
  sourceLang: string;
  targetLang: string;
}

interface ApiResponse {
  responseData: {
    translatedText: string;
  };
  quotaFinished?: boolean;
  responseStatus: number;
}

export const translateText = async ({ 
  sourceText, 
  sourceLang, 
  targetLang 
}: TranslateParams): Promise<string> => {
  try {
    const response = await axios.get<ApiResponse>(API_URL, {
      params: {
        q: sourceText,
        langpair: `${sourceLang}|${targetLang}`
      }
    });
    
    if (response.data.responseStatus === 200) {
      return response.data.responseData.translatedText;
    } else if (response.data.quotaFinished) {
      throw new Error('Translation quota exceeded. Please try again later.');
    } else {
      throw new Error('Translation failed. Please try again.');
    }
  } catch (error) {
    console.error('Translation error:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`Translation failed: ${error.response.data.error || 'Unknown error'}`);
    }
    throw new Error('Failed to translate text. Please try again later.');
  }
};

export const fetchAvailableLanguages = async (): Promise<any[]> => {
  // Return a static list of commonly used languages since MyMemory doesn't have a languages endpoint
  return [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ru', name: 'Russian' },
    { code: 'zh', name: 'Chinese' }
  ];
};