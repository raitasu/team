import { Box } from '@chakra-ui/react';

import { NumberInput } from '../components/NumberInput';

export default {
  title: 'UI/NumberInput',
  component: NumberInput
};

export const Variants = () => (
  <Box width="272px">
    <NumberInput
      width="100%"
      defaultValue="0"
      min={0}
      max={5}
    />
  </Box>
);
