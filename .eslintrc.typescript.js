module.exports = {
  extends: [
    './.eslintrc.base.js',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    'no-shadow': 'off',
    'no-unused-expressions': 'off',
    'no-unused-vars': 'off'
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['./tsconfig.json']
      }
    }
  }
};
