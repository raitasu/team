import { Box, FormControl, Grid, Heading } from '@chakra-ui/react';

import { BaseFormControl } from '../components/FormControl';
import { BaseNumberInput } from '../components/NumberInput';

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
        <BaseFormControl
          label="Label"
          helperText="This is a caption"
        >
          <BaseNumberInput
            defaultValue="0"
            min={0}
            max={5}
          />
        </BaseFormControl>

        <BaseFormControl label="Label">
          <BaseNumberInput
            defaultValue="0"
            min={0}
            max={5}
          />
        </BaseFormControl>

        <BaseFormControl
          label="Label"
          errorMessage="This is an error caption!"
        >
          <BaseNumberInput
            defaultValue="0"
            min={0}
            max={5}
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
          <BaseNumberInput
            defaultValue="0"
            min={0}
            max={5}
          />
        </BaseFormControl>

        <BaseFormControl>
          <BaseNumberInput
            defaultValue="0"
            min={0}
            max={5}
          />
        </BaseFormControl>

        <BaseFormControl
          isError
          errorMessage="This is an error caption!"
        >
          <BaseNumberInput
            defaultValue="0"
            min={0}
            max={5}
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
          <BaseNumberInput
            defaultValue="0"
            min={0}
            max={5}
          />
        </BaseFormControl>

        <BaseFormControl
          label="Label"
          isRequired
        >
          <BaseNumberInput
            defaultValue="0"
            min={0}
            max={5}
          />
        </BaseFormControl>

        <BaseFormControl
          label="Label"
          isError
          errorMessage="This is an error caption!"
          isRequired
        >
          <BaseNumberInput
            defaultValue="0"
            min={0}
            max={5}
          />
        </BaseFormControl>
      </Grid>
    </Box>
  </>
);
