import { Box } from '@chakra-ui/react';

import { BaseNumberInput } from '../components/NumberInput';

export default {
  title: 'UI/NumberInput',
  component: BaseNumberInput
};

export const Variants = () => (
  <Box width="272px">
    <BaseNumberInput
      width="100%"
      defaultValue="0"
      min={0}
      max={5}
    />
  </Box>
);
