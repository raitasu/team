module.exports = {
  '*.{json,css,scss,md}': ['prettier --write'],
  '*.{js,jsx,ts,tsx}': ['eslint --fix'],
  '*.{ts,tsx}': () => 'tsc --noEmit --project tsconfig.json'
};
