import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { translateText } from '../services/translationService';
import type { Translation, TranslationState } from '../types';
import { v4 as uuidv4 } from '../utils/uuid';

export const useTranslationStore = defineStore('translation', () => {
  const state = ref<TranslationState>({
    history: [],
    isLoading: false,
    error: null,
    currentTranslation: null
  });

  const MAX_HISTORY_LENGTH = 10;

  const addToHistory = (translation: Translation) => {
    // Add new translation to the beginning of the array
    state.value.history = [translation, ...state.value.history];
    
    // Limit history to MAX_HISTORY_LENGTH items
    if (state.value.history.length > MAX_HISTORY_LENGTH) {
      state.value.history = state.value.history.slice(0, MAX_HISTORY_LENGTH);
    }

    // Save to localStorage
    saveHistoryToLocalStorage();
  };

  const clearHistory = () => {
    state.value.history = [];
    localStorage.removeItem('translationHistory');
  };

  const translate = async (text: string, sourceLang: string, targetLang: string) => {
    if (!text.trim()) {
      state.value.error = 'Please enter text to translate';
      return;
    }

    state.value.isLoading = true;
    state.value.error = null;

    try {
      const translatedText = await translateText({
        sourceText: text,
        sourceLang,
        targetLang
      });

      const translation: Translation = {
        id: uuidv4(),
        sourceText: text,
        translatedText,
        sourceLang,
        targetLang,
        timestamp: Date.now()
      };

      state.value.currentTranslation = translation;
      addToHistory(translation);
    } catch (error) {
      state.value.error = error instanceof Error ? error.message : 'Translation failed';
    } finally {
      state.value.isLoading = false;
    }
  };

  const loadHistoryFromLocalStorage = () => {
    const savedHistory = localStorage.getItem('translationHistory');
    if (savedHistory) {
      try {
        state.value.history = JSON.parse(savedHistory);
      } catch (e) {
        console.error('Failed to parse translation history from localStorage', e);
      }
    }
  };

  const saveHistoryToLocalStorage = () => {
    localStorage.setItem('translationHistory', JSON.stringify(state.value.history));
  };

  // Initialize by loading from localStorage
  loadHistoryFromLocalStorage();

  return {
    state,
    translate,
    clearHistory,
    getHistory: computed(() => state.value.history),
    isLoading: computed(() => state.value.isLoading),
    error: computed(() => state.value.error),
    currentTranslation: computed(() => state.value.currentTranslation)
  };
});