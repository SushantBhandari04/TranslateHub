<script setup lang="ts">
import { computed } from 'vue';
import { useTranslationStore } from '../stores/translationStore';
// import type { Translation } from '../types';

const translationStore = useTranslationStore();
const history = computed(() => translationStore.getHistory);
const hasHistory = computed(() => history.value.length > 0);

const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString();
};

const clearHistory = () => {
  if (confirm('Are you sure you want to clear your translation history?')) {
    translationStore.clearHistory();
  }
};
</script>

<template>
  <div class="card">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-medium text-gray-800 dark:text-gray-200">Translation History</h3>
      <button 
        v-if="hasHistory"
        @click="clearHistory" 
        class="btn btn-secondary bg-gray-300 dark:bg-gray-700 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600  py-2 px-3 text-sm"
      >
        Clear History
      </button>
    </div>

    <div v-if="!hasHistory" class="text-center py-8 text-gray-500 dark:text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p>No translation history yet</p>
    </div>

    <div v-else>
      <div class="space-y-4 max-h-96 overflow-y-auto pr-2">
        <div 
          v-for="item in history" 
          :key="item.id"
          class="border border-gray-200 dark:border-gray-700 rounded-md p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150 animate-slide-up"
        >
          <div class="flex justify-between items-start mb-2">
            <div class="flex-1">
              <p class="font-medium text-gray-800 dark:text-gray-200 mb-1">{{ item.sourceText }}</p>
              <p class="font-medium text-blue-600 dark:text-blue-400">{{ item.translatedText }}</p>
            </div>
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {{ formatDate(item.timestamp) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>