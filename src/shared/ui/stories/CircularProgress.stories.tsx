import React from 'react';

import { Box, CircularProgress } from '@chakra-ui/react';

import { ProgressBar } from '../components/ProgressBar';

export default {
  title: 'UI/CircularProgress',
  component: CircularProgress
};
export const Variants = () => (
  <Box>
    <ProgressBar
      value={33}
      size="80px"
      thickness="8px"
    />
  </Box>
);
