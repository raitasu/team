import React from 'react';

import { AlertProps } from '@chakra-ui/react';

export interface BaseAlertProps extends AlertProps {
  heading?: React.ReactNode;
  message?: React.ReactNode;
  onClose: () => void;
}
