import { Box, Grid, Heading } from '@chakra-ui/react';

import { FormControl } from '../components/FormControl';
import { NumberInput } from '../components/NumberInput';

export default {
  title: 'UI/FormControls Number Input',
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
          <NumberInput
            defaultValue="0"
            min={0}
            max={5}
          />
        </FormControl>

        <FormControl label="Label">
          <NumberInput
            defaultValue="0"
            min={0}
            max={5}
          />
        </FormControl>

        <FormControl
          label="Label"
          errorMessage="This is an error caption!"
        >
          <NumberInput
            defaultValue="0"
            min={0}
            max={5}
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
          <NumberInput
            defaultValue="0"
            min={0}
            max={5}
          />
        </FormControl>

        <FormControl>
          <NumberInput
            defaultValue="0"
            min={0}
            max={5}
          />
        </FormControl>

        <FormControl errorMessage="This is an error caption!">
          <NumberInput
            defaultValue="0"
            min={0}
            max={5}
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
          <NumberInput
            defaultValue="0"
            min={0}
            max={5}
          />
        </FormControl>

        <FormControl
          label="Label"
          isRequired
        >
          <NumberInput
            defaultValue="0"
            min={0}
            max={5}
          />
        </FormControl>

        <FormControl
          label="Label"
          errorMessage="This is an error caption!"
          isRequired
        >
          <NumberInput
            defaultValue="0"
            min={0}
            max={5}
          />
        </FormControl>
      </Grid>
    </Box>
  </>
);
