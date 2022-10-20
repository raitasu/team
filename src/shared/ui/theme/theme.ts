import { extendTheme } from '@chakra-ui/react';

import { Alert } from './Alert';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { Heading } from './Heading';
import { Input } from './Input';
import { Modal } from './Modal';
import { NumberInput } from './NumberInput';
import { Table } from './Table';
import { Tabs } from './Tabs';
import { Text } from './Text';
import { Textarea } from './Textarea';
import { Tooltip } from './Tooltip';

export const theme = extendTheme({
  styles: {
    global: {
      body: { bg: 'brand.background1' }
    }
  },
  colors: {
    brand: {
      headline: '#212121',
      headline2: '#131313',
      body: '#666666',
      accentRed: '#EF4523',
      red500: '#E53E3E',
      accentGreen: '#56A06B',
      accentYellow: '#CE9D1E',
      darkGray: '#7B7D7D',
      ghostGray: '#646271',
      lightGray: '#B3B3B3',
      gray700: '#2D3748',
      ghostWhite: '#F8F8FA',
      burntSienna: '#F16144',
      crusta: '#F37C64',
      stroke: '#E0E0E0',
      background1: '#F8F8FA',
      background2: '#FFFFFF',
      white: '#FFFFFF',
      shadow: 'rgba(0, 0, 0, 0.1)'
    }
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto'
  },
  components: {
    Alert,
    Button,
    Checkbox,
    Input,
    Modal,
    NumberInput,
    Table,
    Tabs,
    Textarea,
    Heading,
    Text,
    Tooltip
  }
});
