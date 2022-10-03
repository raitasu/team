import React from 'react';

import { Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';

export default {
  title: 'UI/Inputs',
  component: Input
};

export const Variants = () => (
  <Stack
    width="320px"
    spacing={5}
  >
    <Input placeholder="Enter text" />
    <Input
      placeholder="Enter text"
      isInvalid
    />
    <Input
      placeholder="Enter text"
      disabled
    />
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        color="brand.lightGray"
      >
        <MdSearch size="20px" />
      </InputLeftElement>
      <Input placeholder="Enter text" />
    </InputGroup>
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        color="brand.lightGray"
      >
        <MdSearch size="20px" />
      </InputLeftElement>
      <Input
        placeholder="Enter text"
        disabled
      />
    </InputGroup>
  </Stack>
);
