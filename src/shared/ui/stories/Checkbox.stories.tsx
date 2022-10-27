import { Stack } from '@chakra-ui/react';

import { Checkbox } from '../components/Checkbox';

export default {
  title: 'UI/Checkboxes',
  component: Checkbox
};

export const Variants = () => (
  <Stack
    spacing={5}
    direction="column"
  >
    <Checkbox />
    <Checkbox isChecked />
    <Checkbox isDisabled />
    <Checkbox
      isChecked
      isDisabled
    />
  </Stack>
);
