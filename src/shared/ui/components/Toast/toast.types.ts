import { ToastProps as ChackraToastProps } from '@chakra-ui/react';

export type ToastProps = Omit<ChackraToastProps, 'isClosable' | 'icon'> & {
  label: string;
};
