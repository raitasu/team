import React from 'react';

import { Stack, Textarea } from '@chakra-ui/react';

export default {
  title: 'UI/Textarea',
  component: Textarea
};

export const Variants = () => (
  <Stack
    spacing={5}
    width="320px"
  >
    <Textarea placeholder="Hello" />
    <Textarea
      placeholder="Hello"
      isInvalid
    />
    <Textarea
      placeholder="Hello"
      disabled
    />
  </Stack>
);
