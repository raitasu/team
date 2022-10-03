import { Button, useToast } from '@chakra-ui/react';
import { MdOutlineErrorOutline } from 'react-icons/md';

import { ToastProps } from './toast.types';

export const BaseToast = ({ label, ...pathThroughProps }: ToastProps) => {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          isClosable: true,
          icon: <MdOutlineErrorOutline />,
          ...pathThroughProps
        })
      }
    >
      {label}
    </Button>
  );
};
