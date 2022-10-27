import { VStack } from '@chakra-ui/react';

import { NumberInput } from '../components/NumberInput';

export default {
  title: 'UI/NumberInput',
  component: NumberInput
};

export const Variants = () => (
  <VStack
    width="272px"
    spacing={4}
  >
    <NumberInput
      width="100%"
      defaultValue="0"
      min={0}
      max={5}
    />
    <NumberInput
      width="100%"
      defaultValue="0"
      min={0}
      max={5}
      isDisabled
    />
  </VStack>
);
