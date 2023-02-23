import React from 'react';

import { Flex, type BoxProps } from '@chakra-ui/react';

import {
  HEADER_HEIGHT,
  SIDE_PAGE_PADDING
} from '~/shared/layout/layout.constants';

export const PageContainer = ({
  children,
  ...props
}: BoxProps & { children: React.ReactNode }) => (
  <Flex
    {...props}
    height="100vh"
    overflow="hidden"
    padding={`calc(${HEADER_HEIGHT} + 40px) ${SIDE_PAGE_PADDING} 35px`}
    width="100%"
    flexDirection="column"
  >
    {children}
  </Flex>
);
