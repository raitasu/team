import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    brand: {
      headline: '#212121',
      body: '#666666',
      accentRed: '#EF4523',
      darkGray: '#7B7D7D',
      lightGray: '#B3B3B3',
      stroke: '#E0E0E0',
      background1: '#F8F8FA',
      background2: '#FFFFFF'
    }
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto'
  }
});
