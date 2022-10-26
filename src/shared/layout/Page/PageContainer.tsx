import React from 'react';

import { Box } from '@chakra-ui/react';

import { MAX_CONTENT_WIDTH } from '~/shared/ui/ui.constants';

export const PageContainer = ({ children }: { children: React.ReactNode }) => (
  <Box
    maxWidth={MAX_CONTENT_WIDTH}
    margin="auto"
    padding="0 20px"
    width="100%"
  >
    {children}
  </Box>
);
