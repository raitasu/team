import React from 'react';

import { Box, Button, ButtonGroup } from '@chakra-ui/react';

import { MdAdd } from 'react-icons/md';

export const Home = () => (
  <Box>
    Home
    <ButtonGroup
      display="flex"
      justifyContent="space-around"
      marginBottom="20px"
    >
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
    <ButtonGroup
      display="flex"
      justifyContent="space-around"
      marginBottom="20px"
    >
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
    <ButtonGroup
      display="flex"
      justifyContent="space-around"
    >
      <Button
        variant="secondaryOutline"
        leftIcon={<MdAdd size="26px" />}
      >
        secondaryOutline
      </Button>
      <Button
        variant="secondaryOutline"
        leftIcon={<MdAdd size="26px" />}
        disabled
      >
        secondaryOutline disabled
      </Button>
      <Button>default</Button>
      <Button disabled>default disabled</Button>
    </ButtonGroup>
  </Box>
);
