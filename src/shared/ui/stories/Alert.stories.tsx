import { VStack, Stack, useDisclosure, Button } from '@chakra-ui/react';

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
        {isVisibleError ? (
          <BaseAlert
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
          <BaseAlert
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
