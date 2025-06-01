# Language Translator

A modern web application for translating text between languages, built with Vue 3, TypeScript, Pinia, and Tailwind CSS.

## Live URL 

https://translatehub-mu.vercel.app

( Deployed on vercel )

## Features

- 🌐 Translate text between multiple languages
- 🎨 Light and dark mode support
- ⚡ Fast, responsive UI 
- 🔍 Language auto-detection and dynamic language list
- 📝 Character count and keyboard shortcut (Ctrl+Enter) for quick translation
- 📝 History of translated text and clear history option

## Tech Stack

- [Vue 3](https://vuejs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/) for state management
- [Tailwind CSS](https://tailwindcss.com/) (with custom colors and animations)
- [Vite](https://vitejs.dev/) for fast development

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```bash
git clone https://github.com/SushantBhandari04/TranslateHub.git
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
  components/        # Vue components (LanguageSelector, TranslationForm, etc.)
  services/          # API and translation service logic
  stores/            # Pinia stores
  types/             # TypeScript types
  style.css          # Tailwind CSS entry

```


> Made with ❤️ using Vue 3 + Tailwind CSS