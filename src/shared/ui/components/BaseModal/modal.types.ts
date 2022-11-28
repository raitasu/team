import type * as React from 'react';

import {
  type ModalContentProps as ChakraModalContentProps,
  type ModalProps as ChakraModalProps
} from '@chakra-ui/react';

export type ModalProps = {
  shouldUseOverlay?: boolean;
  contentProps?: ChakraModalContentProps;
  title?: React.ReactNode;
  footer?: React.ReactNode;
} & ChakraModalProps;
