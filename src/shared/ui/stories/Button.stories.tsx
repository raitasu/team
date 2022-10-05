import React from 'react';

import { ButtonGroup, SimpleGrid } from '@chakra-ui/react';
import { MdAdd, MdOutlineFilterAlt } from 'react-icons/md';

import { Button } from '../components/Button';
import { IconButton } from '../components/IconButton';

export default {
  title: 'UI/Buttons',
  component: Button,
  IconButton
};
export const Variants = () => (
  <SimpleGrid
    columns={1}
    spacing={10}
    width={1000}
  >
    <ButtonGroup spacing={10}>
      <Button>button</Button>
      <Button
        variant="primary"
        disabled
      >
        button disabled
      </Button>
      <Button
        variant="primary"
        leftIcon={<MdAdd />}
      >
        button with icon
      </Button>
      <Button
        variant="primary"
        leftIcon={<MdAdd />}
        disabled
      >
        button with icon disabled
      </Button>
    </ButtonGroup>
    <ButtonGroup spacing={10}>
      <Button variant="secondaryGhost">button</Button>
      <Button
        variant="secondaryGhost"
        disabled
      >
        button disabled
      </Button>
      <Button
        variant="secondaryGhost"
        leftIcon={<MdAdd />}
      >
        button with icon
      </Button>
      <Button
        leftIcon={<MdAdd />}
        variant="secondaryGhost"
        disabled
      >
        button with icon disabled
      </Button>
    </ButtonGroup>
    <ButtonGroup spacing={10}>
      <Button variant="primaryGhost">button</Button>
      <Button
        variant="primaryGhost"
        disabled
      >
        button disabled
      </Button>
      <Button
        variant="primaryGhost"
        leftIcon={<MdAdd />}
      >
        button with icon
      </Button>
      <Button
        variant="primaryGhost"
        leftIcon={<MdAdd />}
        disabled
      >
        button with icon disabled
      </Button>
    </ButtonGroup>
    <ButtonGroup spacing={10}>
      <Button variant="primaryOutline">button</Button>
      <Button
        variant="primaryOutline"
        disabled
      >
        button disabled
      </Button>
      <Button
        variant="primaryOutline"
        leftIcon={<MdAdd />}
      >
        button with icon
      </Button>
      <Button
        variant="primaryOutline"
        leftIcon={<MdAdd />}
        disabled
      >
        button with icon disabled
      </Button>
    </ButtonGroup>
    <ButtonGroup spacing={10}>
      <IconButton
        aria-label="Filter"
        variant="iconButton"
        icon={<MdOutlineFilterAlt />}
      />
      <IconButton
        aria-label="Filter"
        variant="iconButton"
        icon={<MdOutlineFilterAlt />}
        disabled
      />
    </ButtonGroup>
  </SimpleGrid>
);
