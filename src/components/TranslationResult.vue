<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useTranslationStore } from '../stores/translationStore';

const translationStore = useTranslationStore();
const copySuccess = ref(false);
const copyTimeout = ref<number | null>(null);

const currentTranslation = computed(() => translationStore.currentTranslation);
const hasTranslation = computed(() => !!currentTranslation.value?.translatedText);
const isLoading = computed(() => translationStore.isLoading);
const error = computed(() => translationStore.error);

const copyToClipboard = () => {
  if (!currentTranslation.value?.translatedText) return;
  
  navigator.clipboard.writeText(currentTranslation.value.translatedText)
    .then(() => {
      copySuccess.value = true;
      
      if (copyTimeout.value) {
        window.clearTimeout(copyTimeout.value);
      }
      
      copyTimeout.value = window.setTimeout(() => {
        copySuccess.value = false;
        copyTimeout.value = null;
      }, 2000);
    })
    .catch(err => {
      console.error('Failed to copy text: ', err);
    });
};

// Reset copy status when translation changes
watch(currentTranslation, () => {
  copySuccess.value = false;
  if (copyTimeout.value) {
    window.clearTimeout(copyTimeout.value);
    copyTimeout.value = null;
  }
});
</script>

<template>
  <div class="card mb-6">
    <div class="flex justify-between mb-2">
      <h3 class="text-lg font-medium text-gray-800 dark:text-gray-200">Translation Result</h3>
      <button 
        v-if="hasTranslation"
        @click="copyToClipboard" 
        class="btn bg-gray-200 dark:bg-gray-700 rounded-md flex items-center py-1.5 px-2.5 text-sm cursor-pointer" 
        :class="{ 'bg-green-100 dark:bg-green-800': copySuccess }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
        {{ copySuccess ? 'Copied!' : 'Copy' }}
      </button>
    </div>

    <div 
      v-if="isLoading"
      class="animate-pulse flex space-x-4 bg-gray-100 dark:bg-gray-700 rounded p-4 min-h-[100px]"
    >
      <div class="flex-1 space-y-4 py-1">
        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
      </div>
    </div>
    
    <div 
      v-else-if="error" 
      class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 rounded-md p-4"
    >
      <div class="flex">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        <span>{{ error }}</span>
      </div>
    </div>
    
    <div 
      v-else-if="hasTranslation" 
      class="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-md p-4 min-h-[100px] animate-fade-in"
    >
      <p class="text-lg whitespace-pre-wrap break-words">{{ currentTranslation?.translatedText }}</p>
    </div>
    
    <div 
      v-else 
      class="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-md p-4 min-h-[100px] flex items-center justify-center"
    >
      <p class="text-gray-500 dark:text-gray-400 text-center">
        Translation will appear here
      </p>
    </div>
  </div>
</template>