module.exports = {
  '@emotion/syntax-preference': ['error', 'string'],
  'eslint-comments/no-unused-disable': 'error',
  'eslint-comments/require-description': 'error',
  'max-lines': 'error',
  'no-underscore-dangle': 'off',
  'no-param-reassign': [
    'error',
    { props: true, ignorePropertyModificationsFor: ['state'] }
  ],
  'no-restricted-properties': [
    'error',
    {
      object: 'require',
      property: 'ensure',
      message: 'Please use import() instead.'
    },
    {
      object: 'System',
      property: 'import',
      message: 'Please use import() instead.'
    }
  ],
  'no-console': ['error', { allow: ['warn', 'error'] }],
  'no-unused-vars': 'error',
  'prettier/prettier': 'error'
};
