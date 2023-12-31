import { Box, CircularProgress } from '@chakra-ui/react';

import { ProgressBar } from '~/shared/ui/components/ProgressBar';

export default {
  title: 'UI/CircularProgress',
  component: CircularProgress
};
export const Variants = () => (
  <Box>
    <ProgressBar value={33} />
  </Box>
);
