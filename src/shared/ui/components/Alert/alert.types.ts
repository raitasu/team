import { AlertProps } from '@chakra-ui/react';

export interface BaseAlertProps extends AlertProps {
  isError?: boolean;
  isVisible: boolean;
  message?: string;
  onClose: () => void;
  onOpen: () => void;
}
