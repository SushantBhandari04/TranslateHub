<script setup lang="ts">
import { ref } from 'vue';
import TranslationForm from './components/TranslationForm.vue';
import TranslationResult from './components/TranslationResult.vue';
import TranslationHistory from './components/TranslationHistory.vue';
import LanguageSelector from './components/LanguageSelector.vue';
import ThemeToggle from './components/ThemeToggle.vue';

const sourceLang = ref('en');
const targetLang = ref('hi');
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="container mx-auto max-w-4xl px-4 py-4 flex justify-between items-center">
        <div class="flex items-center">
          <h1 class="text-2xl font-bold text-blue-600 dark:text-blue-400">TranslateHub</h1>
        </div>
        <ThemeToggle />
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <div class="max-w-3xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <LanguageSelector 
            v-model="sourceLang" 
            label="Source Language" 
          />
          <LanguageSelector 
            v-model="targetLang" 
            label="Target Language" 
          />
        </div>

        <TranslationForm 
          :sourceLang="sourceLang" 
          :targetLang="targetLang" 
        />
        
        <TranslationResult />
        
        <TranslationHistory />
      </div>
    </main>

    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
      <div class="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>© {{ new Date().getFullYear() }} TranslateHub. Built with Vue.js.</p>
      </div>
    </footer>
  </div>
</template>