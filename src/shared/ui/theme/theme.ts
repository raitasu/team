import { extendTheme } from '@chakra-ui/react';

import { Button } from './Button';

export const theme = extendTheme({
  colors: {
    brand: {
      headline: '#212121',
      body: '#666666',
      accentRed: '#EF4523',
      darkGray: '#7B7D7D',
      lightGray: '#B3B3B3',
      ghostWhite: '#F8F8FA',
      burntSienna: '#F16144',
      crusta: '#F37C64',
      stroke: '#E0E0E0',
      background1: '#F8F8FA',
      background2: '#FFFFFF'
    }
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto'
  },
  components: {
    Button
  }
});
