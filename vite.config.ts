import path from 'path';

import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import GithubActionsReporter from 'vitest-github-actions-reporter';

export default defineConfig(({ mode }) => ({
  build: {
    outDir: 'build',
    emptyOutDir: true,
    sourcemap: true,
    target: 'es2017'
  },
  server: {
    port: 3000,
    host: true,
    https: true,
    strictPort: true
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    }),
    basicSsl(),
    eslint({
      failOnError: !['staging', 'development', 'test'].includes(mode),
      failOnWarning: false
    })
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    passWithNoTests: true,
    deps: {
      fallbackCJS: true
    },
    reporters: process.env.GITHUB_ACTIONS
      ? ['default', 'junit', new GithubActionsReporter()]
      : 'default',
    coverage: {
      all: true,
      src: ['src']
    }
  }
}));
