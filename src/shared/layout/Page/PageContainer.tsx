import React from 'react';

import { Box } from '@chakra-ui/react';

import {
  HEADER_HEIGHT,
  SIDE_PAGE_PADDING
} from '~/shared/layout/layout.constants';

export const PageContainer = ({ children }: { children: React.ReactNode }) => (
  <Box
    height="100vh"
    overflow="hidden"
    padding={`calc(${HEADER_HEIGHT} + 40px) ${SIDE_PAGE_PADDING} 35px`}
    width="100%"
    minWidth="690px"
  >
    {children}
  </Box>
);
