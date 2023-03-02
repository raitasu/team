import { type ToastProps } from '@chakra-ui/react';

import { SIDE_PAGE_PADDING } from './layout/layout.constants';

export const LocalStorageKey = {
  AuthToken: '@team-front/auth-token',
  RefreshToken: '@team-front/refresh-token'
} as const;

export const DateFormats = {
  Short: 'LLL yyyy',
  Simple: 'dd.MM.yyyy',
  Long: 'PP',
  Full: 'LLLL d, yyyy',
  DateAndTime: 'PPpp'
} as const;

export const toastConfig: ToastProps = {
  variant: 'toast',
  position: 'bottom-left',
  containerStyle: {
    marginLeft: SIDE_PAGE_PADDING,
    marginBottom: '20px'
  },
  duration: 5000
};

export const isNumber = /^[\d.,:]*$/;

export const Patterns = {
  Date: /^19\d{2}|20\d{2}$/i,
  Link: /https:\/\/.[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_.~#?&= ]*/i,
  Number: /^[\d.,:]*$/,
  PhoneNumber: /^(?<code>[+])?[-., ()\d]*$/,
  Email: /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
};
