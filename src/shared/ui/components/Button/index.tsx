import React from 'react';

import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

export const Button = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'size'> & { children: React.ReactNode }
>(({ leftIcon, children, ...passThroughProps }, ref) => (
  <ChakraButton
    {...passThroughProps}
    ref={ref}
    leftIcon={leftIcon && React.cloneElement(leftIcon, { size: '20px' })}
  >
    {children}
  </ChakraButton>
));
