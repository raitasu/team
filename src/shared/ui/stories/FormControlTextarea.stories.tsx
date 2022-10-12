import { Box, FormControl, Grid, Heading, Textarea } from '@chakra-ui/react';

import { BaseFormControl } from '../components/FormControl';

export default {
  title: 'UI/FormControls Textarea',
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
          <Textarea
            placeholder="Hello"
            variant="outline"
          />
        </BaseFormControl>

        <BaseFormControl label="Label">
          <Textarea
            placeholder="Hello"
            variant="outline"
          />
        </BaseFormControl>

        <BaseFormControl
          label="Label"
          isError
          errorMessage="This is an error caption!"
        >
          <Textarea
            placeholder="Hello"
            variant="outline"
          />
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
          <Textarea
            placeholder="Hello"
            variant="outline"
          />
        </BaseFormControl>

        <BaseFormControl>
          <Textarea
            placeholder="Hello"
            variant="outline"
          />
        </BaseFormControl>

        <BaseFormControl
          isError
          errorMessage="This is an error caption!"
        >
          <Textarea
            placeholder="Hello"
            variant="outline"
          />
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
          <Textarea
            placeholder="Hello"
            variant="outline"
          />
        </BaseFormControl>

        <BaseFormControl
          label="Label"
          isRequired
        >
          <Textarea
            placeholder="Hello"
            variant="outline"
          />
        </BaseFormControl>

        <BaseFormControl
          label="Label"
          isError
          errorMessage="This is an error caption!"
          isRequired
        >
          <Textarea
            placeholder="Hello"
            variant="outline"
          />
        </BaseFormControl>
      </Grid>
    </Box>
  </>
);
