import React from 'react';

import { Button, ButtonGroup } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';

const ButtonPreview = () => <div>Test</div>;

export default {
  title: 'UI/Buttons',
  component: ButtonPreview
};

export const Main = () => (
  <ButtonGroup spacing="20px">
    <Button variant="main">main</Button>
    <Button
      variant="main"
      disabled
    >
      main disabled
    </Button>
    <Button
      variant="main"
      leftIcon={<MdAdd size="26px" />}
    >
      main plus
    </Button>
    <Button
      variant="main"
      leftIcon={<MdAdd size="26px" />}
      disabled
    >
      main plus disabled
    </Button>
  </ButtonGroup>
);

export const Secondary = () => (
  <ButtonGroup spacing="20px">
    <Button variant="secondary">secondary</Button>
    <Button
      variant="secondary"
      _hover={{
        border: 'none'
      }}
      disabled
    >
      secondary disabled
    </Button>
    <Button
      variant="secondary"
      color="brand.accentRed"
      _hover={{
        color: 'brand.ghostGray',
        border: 'none'
      }}
      leftIcon={<MdAdd size="26px" />}
    >
      secondary plus
    </Button>
    <Button
      variant="secondary"
      _hover={{
        border: 'none'
      }}
      leftIcon={<MdAdd size="26px" />}
      disabled
    >
      secondary plus disabled
    </Button>
  </ButtonGroup>
);
