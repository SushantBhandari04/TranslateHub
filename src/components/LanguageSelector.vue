<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchAvailableLanguages } from '../services/translationService';
import type { Language } from '../types';

const props = defineProps<{
  modelValue: string;
  label: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const languages = ref<Language[]>([
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' }
]);

const isLoading = ref(false);
const error = ref<string | null>(null);

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};

onMounted(async () => {
  try {
    isLoading.value = true;
    const fetchedLanguages = await fetchAvailableLanguages();
    if (fetchedLanguages && fetchedLanguages.length > 0) {
      languages.value = fetchedLanguages.map((lang: any) => ({
        code: lang.code,
        name: lang.name
      }));
    }
  } catch (err) {
    error.value = 'Failed to load languages';
    console.error('Error loading languages:', err);
    // Fallback to default languages is already set
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="mb-4">
    <label class="block text-md font-medium text-gray-700 dark:text-gray-200 mb-1">
      {{ label }}
    </label>
    <div class="relative w-full">
      <select
        :value="modelValue"
        @change="handleChange"
        :disabled="isLoading"
        class="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 py-2 pl-3 pr-10 text-base text-primary-900 dark:text-primary-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition duration-150 ease-in-out appearance-none"
      >
        <option v-for="language in languages" :key="language.code" :value="language.code">
          {{ language.name }}
        </option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary-400 dark:text-primary-200">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ error }}</p>
  </div>
</template>