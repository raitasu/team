import { Stack } from '@chakra-ui/react';

import { BaseToast } from '../../components/Toast';

export default {
  title: 'UI/Toast',
  component: BaseToast
};

export const Variants = () => (
  <Stack width="300px">
    <BaseToast
      title="Text here."
      description="Description here."
      variant="solid"
      text="Toast"
      duration={5000}
    />
    <BaseToast
      title="Text here."
      description="Description here."
      variant="subtle"
      text="Error toast"
      duration={5000}
    />
  </Stack>
);
