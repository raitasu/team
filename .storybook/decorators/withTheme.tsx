import { DecoratorFn } from '@storybook/react';

import { AppThemeProvider } from '~/shared/ui/theme/AppThemeProvider';

export const WithTheme: DecoratorFn = (Story, context) => (
  <AppThemeProvider>
    <Story {...context} />
  </AppThemeProvider>
);
