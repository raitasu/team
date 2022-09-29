import { Checkbox } from '@chakra-ui/react';

import { CustomIcon } from './customIcon';
import { BaseCheckboxProps } from './types';

export const BaseCheckbox = ({
  label = 'Label',
  isChecked,
  isDisabled,
  ...pathThroughProps
}: BaseCheckboxProps) => (
  <Checkbox
    {...pathThroughProps}
    icon={<CustomIcon isChecked />}
    defaultChecked={isChecked}
    disabled={isDisabled}
  >
    {label}
  </Checkbox>
);
