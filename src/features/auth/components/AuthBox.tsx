import React from 'react';

import { Box } from '@chakra-ui/react';

export const AuthBox = ({ children }: { children: React.ReactNode }) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minWidth="431px"
      minHeight="295px"
      border="1px solid"
      borderColor="brand.stroke"
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      borderRadius="base"
    >
      {children}
    </Box>
  </Box>
);
