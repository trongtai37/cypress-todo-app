import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import istanbul from 'vite-plugin-istanbul';

const shouldInstrumentCode = process.env.NODE_ENV === 'test';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    shouldInstrumentCode &&
      istanbul({
        cypress: true,
        checkProd: true,
      }),
  ],
});
