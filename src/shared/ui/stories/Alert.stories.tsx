import { Stack, useDisclosure, VStack } from '@chakra-ui/react';

import { Button } from '~/shared/ui/components/Button';

import { Alert } from '../components/Alert';

export default {
  title: 'UI/Alert',
  component: Alert
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
        {isVisibleError ? (
          <Alert
            isError
            status="error"
            onClose={onCloseError}
            onOpen={onOpenError}
            isVisible={isVisibleError}
          />
        ) : (
          <Button onClick={onOpenError}>Show Alert</Button>
        )}
      </VStack>
      <VStack
        minHeight="60px"
        justifyContent="center"
      >
        {isVisible ? (
          <Alert
            status="success"
            onClose={onClose}
            onOpen={onOpen}
            isVisible={isVisible}
          />
        ) : (
          <Button onClick={onOpen}>Show Alert</Button>
        )}
      </VStack>
    </Stack>
  );
};
