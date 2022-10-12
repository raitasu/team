import { Box, FormControl, Grid, Heading, Input } from '@chakra-ui/react';

import { BaseFormControl } from '../components/FormControl';

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
        <BaseFormControl
          label="Label"
          helperText="This is a caption"
        >
          <Input placeholder="Enter text" />
        </BaseFormControl>

        <BaseFormControl label="Label">
          <Input placeholder="Enter text" />
        </BaseFormControl>

        <BaseFormControl
          label="Label"
          errorMessage="This is an error caption!"
        >
          <Input placeholder="Enter text" />
        </BaseFormControl>
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
        <BaseFormControl helperText="This is a caption">
          <Input placeholder="Enter text" />
        </BaseFormControl>

        <BaseFormControl>
          <Input placeholder="Enter text" />
        </BaseFormControl>

        <BaseFormControl
          isError
          errorMessage="This is an error caption!"
        >
          <Input placeholder="Enter text" />
        </BaseFormControl>
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
        <BaseFormControl
          label="Label"
          helperText="This is a caption"
          isRequired
        >
          <Input placeholder="Enter text" />
        </BaseFormControl>

        <BaseFormControl
          label="Label"
          isRequired
        >
          <Input placeholder="Enter text" />
        </BaseFormControl>

        <BaseFormControl
          label="Label"
          isError
          errorMessage="This is an error caption!"
          isRequired
        >
          <Input placeholder="Enter text" />
        </BaseFormControl>
      </Grid>
    </Box>
  </>
);
