import type React from 'react';

import { type AlertProps } from '@chakra-ui/react';

export interface BaseAlertProps extends AlertProps {
  heading?: React.ReactNode;
  message?: React.ReactNode;
  onClose: () => void;
}
