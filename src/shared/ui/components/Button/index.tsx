import React from 'react';

import type { ButtonProps } from '@chakra-ui/react';
import { Button as ChakraButton } from '@chakra-ui/react';

export const Button = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'size'> & { children: React.ReactNode }
>(({ leftIcon, rightIcon, children, ...passThroughProps }, ref) => (
  <ChakraButton
    {...passThroughProps}
    ref={ref}
    leftIcon={leftIcon && React.cloneElement(leftIcon, { size: '20px' })}
    rightIcon={rightIcon && React.cloneElement(rightIcon, { size: '20px' })}
  >
    {children}
  </ChakraButton>
));
