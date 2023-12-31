const languageOptions = [
  ['English', 'en'],
  ['Русский', 'ru']
].map(([name, value]) => ({
  value,
  title: `${name} (${value.toUpperCase()})`
}));

export const localeControl = {
  name: 'Language',
  description: 'Language switcher',
  defaultValue: 'en',
  toolbar: {
    icon: 'globe',
    items: languageOptions,
    dynamicTitle: true
  }
};
