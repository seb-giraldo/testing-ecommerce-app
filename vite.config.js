import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    // Playwright specs live in e2e/ and run via `npm run test:e2e`, not Vitest
    exclude: [...configDefaults.exclude, 'e2e/**'],
  },
});
