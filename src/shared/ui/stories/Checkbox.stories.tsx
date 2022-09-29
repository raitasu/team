import { Stack } from '@chakra-ui/react';

import { BaseCheckbox } from '../components/Checkbox';

export default {
  title: 'UI/Checkboxes',
  component: BaseCheckbox
};

export const Variants = () => (
  <Stack
    spacing={5}
    direction="column"
  >
    <BaseCheckbox />
    <BaseCheckbox isChecked />
    <BaseCheckbox isDisabled />
  </Stack>
);
