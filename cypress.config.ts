import { defineConfig } from 'cypress';
import coverageTask from '@cypress/code-coverage/task';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      coverageTask(on, config);
      return config;
    },
    baseUrl: 'http://localhost:5173',
    excludeSpecPattern: ['**/*.snap', '**/__snapshot__/*', '**/smoke.js'],
  },
});
