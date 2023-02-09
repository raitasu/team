import { type ToastProps } from '@chakra-ui/react';

import { SIDE_PAGE_PADDING } from './layout/layout.constants';

export const LocalStorageKey = {
  AuthToken: '@team-front/auth-token',
  RefreshToken: '@team-front/refresh-token'
} as const;

export const DateFormats = {
  Short: 'LLL yyyy',
  Long: 'PP',
  Full: 'LLLL d, yyyy'
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
