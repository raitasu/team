module.exports = {
  extends: ['./.eslintrc.base.js'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        './.eslintrc.base.js',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ],
      rules: {
        'no-shadow': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-shadow': 'error',
        'import/no-extraneous-dependencies': 'off'
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
    }
  ]
};
