import { DecoratorFn } from '@storybook/react';

import { AppThemeProvider } from '~/shared/ui/theme/AppThemeProvider';

export const decorators: DecoratorFn[] = [
  (Story) => (
    <AppThemeProvider>
      <Story />
    </AppThemeProvider>
  )
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
