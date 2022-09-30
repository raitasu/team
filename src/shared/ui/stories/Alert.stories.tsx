import React from 'react';

import { VStack, Stack, useDisclosure } from '@chakra-ui/react';

import { BaseAlert } from '../components/Alert';

export default {
  title: 'UI/Alert',
  component: BaseAlert
};

export const Variants = () => {
  const {
    isOpen: isVisible,
    onClose,
    onOpen
  } = useDisclosure({ defaultIsOpen: true });

  const {
    isOpen: isVisibleError,
    onClose: onCloseError,
    onOpen: onOpenError
  } = useDisclosure({ defaultIsOpen: true });

  return (
    <Stack
      w="400px"
      direction="column"
      spacing={2}
    >
      <VStack
        minHeight="60px"
        justifyContent="center"
      >
        <BaseAlert
          isError
          status="error"
          onClose={onCloseError}
          onOpen={onOpenError}
          isVisible={isVisibleError}
        />
      </VStack>
      <VStack
        minHeight="60px"
        justifyContent="center"
      >
        <BaseAlert
          status="success"
          onClose={onClose}
          onOpen={onOpen}
          isVisible={isVisible}
        />
      </VStack>
    </Stack>
  );
};
