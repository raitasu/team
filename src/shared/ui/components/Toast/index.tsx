import { Button, useToast } from '@chakra-ui/react';
import { MdOutlineErrorOutline } from 'react-icons/md';

import { ToastProps } from './toast.types';

export const BaseToast = ({
  variant,
  title,
  description,
  text,
  duration
}: ToastProps) => {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title,
          description,
          duration,
          isClosable: true,
          variant,
          icon: <MdOutlineErrorOutline />
        })
      }
    >
      {text}
    </Button>
  );
};
