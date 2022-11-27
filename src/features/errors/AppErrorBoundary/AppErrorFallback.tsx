import { Box } from '@chakra-ui/react';

import { Alert } from '~/shared/ui/components/Alert';

export const AppErrorFallback = ({
  componentStack,
  error
}: {
  error: Error;
  componentStack: string | null;
}) => (
  <Box
    maxWidth="100%"
    padding="20px"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Alert
      status="error"
      width="auto"
      maxWidth="100%"
      overflow="auto"
      heading={error.message || 'Application error'}
      message={
        import.meta.env.DEV && componentStack
          ? componentStack
          : 'Oops, something went wrong. Please, contact developers'
      }
    />
  </Box>
);
