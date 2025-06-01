<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTranslationStore } from '../stores/translationStore';

const props = defineProps<{
  sourceLang: string;
  targetLang: string;
}>();

const sourceText = ref('');
const translationStore = useTranslationStore();

const isLoading = computed(() => translationStore.isLoading);
const charCount = computed(() => sourceText.value.length);
const isInputEmpty = computed(() => sourceText.value.trim().length === 0);

const handleTranslate = () => {
  if (!sourceText.value.trim()) return;
  translationStore.translate(sourceText.value, props.sourceLang, props.targetLang);
};

const clearInput = () => {
  sourceText.value = '';
};
</script>

<template>
  <div class="mb-6 p-6 rounded-lg shadow bg-white dark:bg-gray-800 animate-fade-in">
    <div class="mb-4">
      <label for="sourceText" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
        Enter English text
      </label>
      <div class="relative">
        <textarea
          id="sourceText"
          v-model="sourceText"
          rows="4"
          class="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition duration-150 ease-in-out resize-none"
          placeholder="Type or paste your text here..."
          :disabled="isLoading"
          @keydown.ctrl.enter="handleTranslate"
        ></textarea>
        <button
          v-if="sourceText.length > 0"
          @click="clearInput"
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-blue-100 transition"
          title="Clear text"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <div class="flex justify-between mt-2 text-xs text-gray-400 dark:text-gray-300">
        <span>{{ charCount }} characters</span>
        <span>Ctrl+Enter to translate</span>
      </div>
    </div>

    <div class="flex justify-end">
      <button
        @click="handleTranslate"
        class="flex items-center px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow transition focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
        :disabled="isLoading || isInputEmpty"
      >
        <span v-if="isLoading" class="mr-2">
          <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
        <span>{{ isLoading ? 'Translating...' : 'Translate' }}</span>
      </button>
    </div>
  </div>
</template>