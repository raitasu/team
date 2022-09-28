import React from 'react';

import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

export const Button = ({
  leftIcon,
  children,
  ...passThroughProps
}: Omit<ButtonProps, 'size'> & { children: React.ReactNode }) => (
  <ChakraButton
    {...passThroughProps}
    leftIcon={leftIcon && React.cloneElement(leftIcon, { size: '20px' })}
  >
    {children}
  </ChakraButton>
);
