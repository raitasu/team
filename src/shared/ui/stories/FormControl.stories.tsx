import { Box, Grid, Heading, Input } from '@chakra-ui/react';

import { FormControl } from '../components/FormControl';

export default {
  title: 'UI/FormControls',
  component: FormControl
};

export const Variants = () => (
  <>
    <Box>
      <Heading
        size="lg"
        marginBottom="20px"
      >
        Form control with label
      </Heading>
      <Grid
        width="680px"
        gap="20px"
        templateColumns="repeat(2, 1fr)"
      >
        <FormControl
          label="Label"
          helperText="This is a caption"
        >
          <Input placeholder="Enter text" />
        </FormControl>

        <FormControl label="Label">
          <Input placeholder="Enter text" />
        </FormControl>

        <FormControl
          label="Label"
          errorMessage="This is an error caption!"
        >
          <Input placeholder="Enter text" />
        </FormControl>
      </Grid>
    </Box>

    <Box marginTop="30px">
      <Heading
        size="lg"
        marginBottom="20px"
      >
        Form control without label
      </Heading>
      <Grid
        width="680px"
        gap="20px"
        templateColumns="repeat(2, 1fr)"
      >
        <FormControl helperText="This is a caption">
          <Input placeholder="Enter text" />
        </FormControl>

        <FormControl>
          <Input placeholder="Enter text" />
        </FormControl>

        <FormControl
          isError
          errorMessage="This is an error caption!"
        >
          <Input placeholder="Enter text" />
        </FormControl>
      </Grid>
    </Box>

    <Box marginTop="30px">
      <Heading
        size="lg"
        marginBottom="20px"
      >
        Form control require
      </Heading>
      <Grid
        width="680px"
        gap="20px"
        templateColumns="repeat(2, 1fr)"
      >
        <FormControl
          label="Label"
          helperText="This is a caption"
          isRequired
        >
          <Input placeholder="Enter text" />
        </FormControl>

        <FormControl
          label="Label"
          isRequired
        >
          <Input placeholder="Enter text" />
        </FormControl>

        <FormControl
          label="Label"
          isError
          errorMessage="This is an error caption!"
          isRequired
        >
          <Input placeholder="Enter text" />
        </FormControl>
      </Grid>
    </Box>
  </>
);
