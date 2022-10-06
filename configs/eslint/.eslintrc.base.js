module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'airbnb',
    'airbnb/hooks',
    'plugin:jsx-a11y/recommended',
    'plugin:eslint-comments/recommended',
    'prettier'
  ],
  plugins: ['jsx-a11y', '@emotion', 'prettier'],
  rules: {
    '@emotion/syntax-preference': ['error', 'string'],
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'import/no-default-export': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.{js,jsx,ts,tsx}',
          '**/*.spec.{js,jsx,ts,tsx}',
          '**/setupTests.{js,jsx,ts,tsx}'
        ]
      }
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always-and-inside-groups',
        pathGroupsExcludedImportTypes: ['react'],
        groups: [
          'unknown',
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index']
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before'
          }
        ],
        alphabetize: { order: 'asc', caseInsensitive: true }
      }
    ],
    'import/prefer-default-export': 'off',
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['state'] }
    ],
    'eslint-comments/no-unused-disable': 'error',
    'eslint-comments/require-description': 'error'
  }
};
