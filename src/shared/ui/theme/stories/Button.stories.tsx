import React from 'react';

import { Button, ButtonGroup, SimpleGrid } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';

export default {
  title: 'UI/Buttons',
  component: Button
};

export const Variants = () => (
  <SimpleGrid
    columns={1}
    spacing={10}
  >
    <ButtonGroup spacing="20px">
      <Button variant="primary">button</Button>
      <Button
        variant="primary"
        disabled
      >
        button disabled
      </Button>
      <Button
        variant="primary"
        leftIcon={<MdAdd size="26px" />}
      >
        button with icon
      </Button>
      <Button
        variant="primary"
        leftIcon={<MdAdd size="26px" />}
        disabled
      >
        button with icon disabled
      </Button>
    </ButtonGroup>
    <ButtonGroup spacing="20px">
      <Button variant="secondaryGhost">button</Button>
      <Button
        variant="secondaryGhost"
        disabled
      >
        button disabled
      </Button>
      <Button
        variant="secondaryGhost"
        leftIcon={<MdAdd size="26px" />}
      >
        button with icon
      </Button>
      <Button
        variant="secondaryGhost"
        leftIcon={<MdAdd size="26px" />}
        disabled
      >
        button with icon disabled
      </Button>
    </ButtonGroup>
    <ButtonGroup spacing="20px">
      <Button variant="primaryGhost">button</Button>
      <Button
        variant="primaryGhost"
        disabled
      >
        button disabled
      </Button>
      <Button
        variant="primaryGhost"
        leftIcon={<MdAdd size="26px" />}
      >
        button with icon
      </Button>
      <Button
        variant="primaryGhost"
        leftIcon={<MdAdd size="26px" />}
        disabled
      >
        button with icon disabled
      </Button>
    </ButtonGroup>
    <ButtonGroup spacing="20px">
      <Button variant="primaryOutline">button</Button>
      <Button
        variant="primaryOutline"
        disabled
      >
        button disabled
      </Button>
      <Button
        variant="primaryOutline"
        leftIcon={<MdAdd size="26px" />}
      >
        button with icon
      </Button>
      <Button
        variant="primaryOutline"
        leftIcon={<MdAdd size="26px" />}
        disabled
      >
        button with icon disabled
      </Button>
    </ButtonGroup>
  </SimpleGrid>
);
