import { Stack } from '@chakra-ui/react';

import { Button } from '~/shared/ui/components/Button';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';

export default {
  title: 'UI/Toast'
};

export const Variants = () => {
  const toast = useSuccessToast({
    title: 'Title Here',
    description: 'Description here',
    duration: 50000,
    variant: 'toast'
  });
  const errorToast = useErrorToast({
    title: 'Title Here',
    description: 'Description here',
    duration: 50000,
    variant: 'toast'
  });

  return (
    <Stack width="300px">
      <Button onClick={() => toast()}>Toast</Button>
      <Button onClick={() => errorToast()}>Error toast</Button>
    </Stack>
  );
};
