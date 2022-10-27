import { Stack, useToast } from '@chakra-ui/react';
import { MdOutlineErrorOutline } from 'react-icons/md';

import { Button } from '~/shared/ui/components/Button';

export default {
  title: 'UI/Toast',
  component: useToast
};

export const Variants = () => {
  const toast = useToast({
    isClosable: true,
    icon: <MdOutlineErrorOutline />,
    title: 'Title',
    description: 'Description here.',
    variant: 'solid',
    duration: 5000
  });
  const errorToast = useToast({
    isClosable: true,
    icon: <MdOutlineErrorOutline />,
    title: 'Title',
    description: 'Description here.',
    variant: 'subtle',
    duration: 5000
  });

  return (
    <Stack width="300px">
      <Button onClick={() => toast()}>Toast</Button>
      <Button onClick={() => errorToast()}>Error toast</Button>
    </Stack>
  );
};
