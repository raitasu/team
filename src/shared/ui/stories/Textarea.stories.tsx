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
    <Textarea
      placeholder="Hello"
      variant="outline"
    />
    <Textarea
      placeholder="Hello"
      variant="outline"
      isInvalid
    />
    <Textarea
      placeholder="Hello"
      variant="outline"
      disabled
    />
  </Stack>
);
