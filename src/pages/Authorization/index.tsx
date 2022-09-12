import React, { useState } from 'react';

import { Box } from '@chakra-ui/react';

import { ErrorState } from './components/ErrorState';

import { MainState } from './components/MainState';

export type AuthorizationType = {
  error: boolean;
  setError: (value: boolean) => void;
};
export const Authorization = () => {
  const [error, setError] = useState(false);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="431px"
        height="295px"
        border="1px solid #E0E0E0"
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
        borderRadius="4px"
      >
        {error ? (
          <ErrorState
            error={error}
            setError={setError}
          />
        ) : (
          <MainState
            error={error}
            setError={setError}
          />
        )}
      </Box>
    </Box>
  );
};
