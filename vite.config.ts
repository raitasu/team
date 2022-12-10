import * as fs from 'fs';
import path from 'path';

import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, type PluginOption } from 'vite';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';
import GithubActionsReporter from 'vitest-github-actions-reporter';

const getSvgrPluginOptions = () => ({
  svgrOptions: {
    prettier: false,
    svgo: false,
    svgoConfig: {
      plugins: [{ removeViewBox: false }]
    },
    titleProp: true,
    ref: true
  }
});

const getEslintPluginOptions = (isProductionBuild: boolean) => ({
  failOnError: isProductionBuild,
  failOnWarning: false
});

const getHttpsOptions = (mode: string) => {
  if (mode === 'development') {
    return {
      key: fs.readFileSync('./.cert/localhost.key'),
      cert: fs.readFileSync('./.cert/localhost.crt')
    };
  }

  if (mode === 'test') {
    return true;
  }

  return false;
};

export default defineConfig(({ mode }) => {
  const isProductionBuild = !['staging', 'development', 'test'].includes(mode);
  const isDevelopmentBuild = mode === 'development';

  const serverConfig = {
    port: 3000,
    host: true,
    strictPort: true
  };

  const plugins: PluginOption[] = [
    svgr(getSvgrPluginOptions()),
    react(),
    eslint(getEslintPluginOptions(isProductionBuild))
  ];

  if (mode === 'test') {
    plugins.push(basicSsl());
  }

  return {
    build: {
      outDir: 'build',
      emptyOutDir: true,
      sourcemap: isDevelopmentBuild,
      target: 'es2018'
    },
    server: {
      ...serverConfig,
      https: getHttpsOptions(mode)
    },
    preview: {
      ...serverConfig,
      https: getHttpsOptions(mode)
    },
    plugins,
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
        src: ['src']
      }
    }
  };
});
