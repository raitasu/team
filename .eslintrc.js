module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  plugins: ['react'],
  extends: ['./tools/configs/eslint/.eslintrc.base.js'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['./tools/configs/eslint/.eslintrc.typescript.js']
    },
    {
      files: ['**/*.stories.ts', '**/*.stories.tsx'],
      extends: ['./tools/configs/eslint/.eslint.storybook.js']
    },
    {
      files: ['vite.config.ts', '.storybook/main.ts', 'jest.config.ts'],
      rules: {
        'import/no-default-export': 'off'
      }
    },
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react']
    }
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },
  parserOptions: {
    sourceType: 'module',
    requireConfigFile: false
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/jsx-uses-vars': 'warn',
    'react/jsx-uses-react': 'warn'
  }
};
