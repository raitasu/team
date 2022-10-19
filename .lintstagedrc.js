module.exports = {
  '*.{json,css,scss,md}': ['prettier --write'],
  '*.{js,jsx,ts,tsx}': ['eslint --fix'],
  '*.{ts,tsx}': () => 'tsc --noEmit --project tsconfig.json',
  'package.json': () =>
    'node tools/scripts/qa/lint.mjs --fix --skip-eslint --skip-ts --skip-i18n'
};
