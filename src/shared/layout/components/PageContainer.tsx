import React from 'react';

import { Box } from '@chakra-ui/react';

export const PageContainer = ({ children }: { children: React.ReactNode }) => (
  <Box
    maxWidth="1380px"
    margin="auto"
    padding="0 20px"
    width="100%"
  >
    {children}
  </Box>
);
