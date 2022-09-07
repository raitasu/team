import { extendTheme } from '@chakra-ui/react';

import { Alert } from './Alert';
import { Button } from './Button';
import { Input } from './Input';
import { Modal } from './Modal';
import { Table } from './Table';
import { Tabs } from './Tabs';
import { Textarea } from './Textarea';

export const theme = extendTheme({
  styles: {
    global: {
      body: { bg: 'brand.background1' }
    }
  },
  colors: {
    brand: {
      headline: '#212121',
      body: '#666666',
      accentRed: '#EF4523',
      accentGreen: '#56A06B',
      accentYellow: '#CE9D1E',
      darkGray: '#7B7D7D',
      ghostGray: '#646271',
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
    Alert,
    Button,
    Input,
    Modal,
    Table,
    Tabs,
    Textarea
  }
});
