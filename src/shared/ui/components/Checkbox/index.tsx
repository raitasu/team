import React from 'react';

import { Checkbox } from '@chakra-ui/react';

import { CustomIcon } from './customIcon';
import { BaseCheckboxProps } from './types';

export const BaseCheckbox = React.forwardRef<
  HTMLInputElement,
  BaseCheckboxProps
>(({ label = 'Label', isChecked, isDisabled, ...pathThroughProps }, ref) => (
  <Checkbox
    {...pathThroughProps}
    icon={<CustomIcon isChecked={isChecked} />}
    isChecked={isChecked}
    disabled={isDisabled}
    ref={ref}
  >
    {label}
  </Checkbox>
));
