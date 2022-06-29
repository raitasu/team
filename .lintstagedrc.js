module.exports = {
  'src/**/*.{js,jsx,ts,tsx,json,css,scss,md}': ['prettier --write'],
  'src/**/*.{js,jsx,ts,tsx}': ['eslint --fix'],
  'src/**/*.{ts,tsx}': () => 'tsc --noEmit --project tsconfig.json'
};
