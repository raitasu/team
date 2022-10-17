const general = require('./rules/general');
const imports = require('./rules/imports');
const promises = require('./rules/promises');
const react = require('./rules/react');

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
  plugins: ['jsx-a11y', 'eslint-comments', '@emotion', 'promise', 'prettier'],
  rules: {
    ...general,
    ...imports,
    ...promises,
    ...react
  }
};
