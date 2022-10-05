import React from 'react';

import {
  IconButton as ChakraIconButton,
  IconButtonProps
} from '@chakra-ui/react';

export const IconButton = ({
  icon,
  ...passThroughProps
}: Omit<IconButtonProps, 'size'>) => (
  <ChakraIconButton
    {...passThroughProps}
    icon={icon && React.cloneElement(icon, { size: '26px' })}
  />
);
