import { Box, Grid, Heading, Textarea } from '@chakra-ui/react';

import { FormControl } from '../components/FormControl';

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
        <FormControl
          label="Label"
          helperText="This is a caption"
        >
          <Textarea
            placeholder="Hello"
            variant="outline"
          />
        </FormControl>

        <FormControl label="Label">
          <Textarea
            placeholder="Hello"
            variant="outline"
          />
        </FormControl>

        <FormControl
          label="Label"
          errorMessage="This is an error caption!"
        >
          <Textarea
            placeholder="Hello"
            variant="outline"
          />
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
          <Textarea
            placeholder="Hello"
            variant="outline"
          />
        </FormControl>

        <FormControl>
          <Textarea
            placeholder="Hello"
            variant="outline"
          />
        </FormControl>

        <FormControl errorMessage="This is an error caption!">
          <Textarea
            placeholder="Hello"
            variant="outline"
          />
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
          <Textarea
            placeholder="Hello"
            variant="outline"
          />
        </FormControl>

        <FormControl
          label="Label"
          isRequired
        >
          <Textarea
            placeholder="Hello"
            variant="outline"
          />
        </FormControl>

        <FormControl
          label="Label"
          errorMessage="This is an error caption!"
          isRequired
        >
          <Textarea
            placeholder="Hello"
            variant="outline"
          />
        </FormControl>
      </Grid>
    </Box>
  </>
);
