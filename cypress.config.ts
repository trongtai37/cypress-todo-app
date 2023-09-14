import { defineConfig } from 'cypress';
import coverageTask from '@cypress/code-coverage/task';
import viteConfig from './vite.config';
import vitePreprocessor from 'cypress-vite';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      coverageTask(on, config);
      on('file:preprocessor', vitePreprocessor(viteConfig));
      return config;
    },
    baseUrl: 'http://localhost:5173',
    excludeSpecPattern: ['**/*.snap', '**/__snapshot__/*', '**/smoke.js'],
    projectId: 'nwfprz',
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: {
        viteConfig,
        server: {
          port: 5174,
        },
      },
    },
    specPattern: ['src/**/*.spec.cy.tsx'],
  },
});
