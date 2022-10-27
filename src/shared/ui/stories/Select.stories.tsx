import { FormLabel, Stack } from '@chakra-ui/react';

import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';

export default {
  title: 'UI/Select',
  component: Select
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
  <Stack
    width="320px"
    spacing={6}
  >
    <FormControl>
      <FormLabel color="brand.body">Simple select</FormLabel>
      <Select
        options={options}
        isMulti={false}
        size="md"
      />
    </FormControl>

    <FormControl mt={4}>
      <FormLabel color="brand.body">Multi select</FormLabel>
      <Select
        options={options}
        isMulti
        size="md"
      />
    </FormControl>

    <FormControl mt={4}>
      <FormLabel color="brand.body">Disabled select</FormLabel>
      <Select
        options={options}
        isDisabled
        size="md"
      />
    </FormControl>
  </Stack>
);
