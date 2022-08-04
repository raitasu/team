import * as React from 'react';

import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from './theme';

export const AppThemeProvider: React.FC<{ children: JSX.Element }> = ({
  children
}) => <ChakraProvider theme={theme}>{children}</ChakraProvider>;
