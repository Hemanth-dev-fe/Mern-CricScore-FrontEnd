import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'use-sync-external-store-with-selector': path.resolve(__dirname, 'node_modules/use-sync-external-store-with-selector/cjs/use-sync-external-store-with-selector.production.js')
    }
  }
});