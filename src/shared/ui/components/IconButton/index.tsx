import React from 'react';

import type { IconButtonProps } from '@chakra-ui/react';
import { IconButton as ChakraIconButton } from '@chakra-ui/react';

export const IconButton = React.forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, 'size'>
>(({ icon, ...passThroughProps }, ref) => (
  <ChakraIconButton
    {...passThroughProps}
    ref={ref}
    icon={icon && React.cloneElement(icon, { size: '26px' })}
  />
));
