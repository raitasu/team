import React from 'react';

import { Box, type BoxProps } from '@chakra-ui/react';

import {
  HEADER_HEIGHT,
  SIDE_PAGE_PADDING
} from '~/shared/layout/layout.constants';

export const PageContainer = ({
  children,
  ...props
}: BoxProps & { children: React.ReactNode }) => (
  <Box
    {...props}
    height="100vh"
    overflow="hidden"
    padding={`calc(${HEADER_HEIGHT} + 40px) ${SIDE_PAGE_PADDING} 35px`}
    width="100%"
  >
    {children}
  </Box>
);
