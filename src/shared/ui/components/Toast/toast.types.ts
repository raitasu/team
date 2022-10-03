import { ToastProps as ChakraToastProps } from '@chakra-ui/react';

export type ToastProps = Omit<ChakraToastProps, 'isClosable' | 'icon'> & {
  label: string;
};
