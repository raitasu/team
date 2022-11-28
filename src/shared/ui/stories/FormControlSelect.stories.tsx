import { Box, Grid, Heading } from '@chakra-ui/react';

import { FormControl } from '../components/FormControl';
import { Select } from '../components/Select';

export default {
  title: 'UI/FormControls Select',
  component: FormControl
};

const options = [
  {
    value: 'January',
    label: 'January'
  },
  {
    value: 'February',
    label: 'February'
  },
  {
    value: 'March',
    label: 'March'
  },
  {
    value: 'April',
    label: 'April'
  },
  {
    value: 'May',
    label: 'May'
  },
  {
    value: 'June',
    label: 'June'
  },
  {
    value: 'July',
    label: 'July'
  },
  {
    value: 'August',
    label: 'August'
  },
  {
    value: 'September',
    label: 'September'
  },
  {
    value: 'October',
    label: 'October'
  },
  {
    value: 'November',
    label: 'November'
  },
  {
    value: 'December',
    label: 'December'
  }
];

export const Variants = () => (
  <>
    <Box>
      <Heading
        size="lg"
        marginBottom="20px"
      >
        Form control select with label
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
          <Select
            options={options}
            isMulti={false}
            size="md"
          />
        </FormControl>

        <FormControl label="Label">
          <Select
            options={options}
            isMulti={false}
            size="md"
          />
        </FormControl>
      </Grid>
    </Box>

    <Box marginTop="30px">
      <Heading
        size="lg"
        marginBottom="20px"
      >
        Form control select without label
      </Heading>
      <Grid
        width="680px"
        gap="20px"
        templateColumns="repeat(2, 1fr)"
      >
        <FormControl helperText="This is a caption">
          <Select
            options={options}
            isMulti={false}
            size="md"
          />
        </FormControl>

        <FormControl>
          <Select
            options={options}
            isMulti={false}
            size="md"
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
          <Select
            options={options}
            isMulti={false}
            size="md"
          />
        </FormControl>

        <FormControl
          label="Label"
          isRequired
        >
          <Select
            options={options}
            isMulti={false}
            size="md"
          />
        </FormControl>

        <FormControl
          label="Label"
          errorMessage="This is an error caption!"
          isRequired
        >
          <Select
            options={options}
            isMulti={false}
            size="md"
          />
        </FormControl>
      </Grid>
    </Box>
  </>
);
