import { AppThemeProvider } from '../src/shared/ui/theme/AppThemeProvider';

export const decorators = [
  (Story) => (
    <AppThemeProvider>
      <Story />
    </AppThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
