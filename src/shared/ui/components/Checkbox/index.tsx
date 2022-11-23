import React from 'react';

import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';

import { CustomIcon } from './customIcon';
import { type BaseCheckboxProps } from './types';

export const Checkbox = React.forwardRef<HTMLInputElement, BaseCheckboxProps>(
  ({ label = 'Label', isChecked, isDisabled, ...pathThroughProps }, ref) => (
    <ChakraCheckbox
      {...pathThroughProps}
      icon={<CustomIcon isChecked={isChecked} />}
      isChecked={isChecked}
      disabled={isDisabled}
      ref={ref}
    >
      {label}
    </ChakraCheckbox>
  )
);
