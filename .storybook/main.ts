import path from 'path';

import type { StorybookViteConfig } from '@storybook/builder-vite';
import { mergeConfig } from 'vite';

const config: StorybookViteConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite'
  },
  features: {
    emotionAlias: false
  },
  refs: {
    '@chakra-ui/react': { disable: true }
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript'
  },

  viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      build: {
        target: 'es2017',
        sourcemap: false
      },
      resolve: {
        alias: {
          '~': path.resolve(__dirname, '../src')
        }
      }
    });
  }
};

export default config;
