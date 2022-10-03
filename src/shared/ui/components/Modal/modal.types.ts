import React from 'react';

import {
  ModalContentProps as ChakraModalContentProps,
  ModalProps as ChakraModalProps
} from '@chakra-ui/react';

export type ModalProps = {
  shouldUseOverlay?: boolean;
  contentProps: ChakraModalContentProps;
  title?: React.ReactNode;
  footer?: React.ReactNode;
} & ChakraModalProps;
