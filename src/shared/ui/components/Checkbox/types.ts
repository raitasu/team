import type { CheckboxProps } from '@chakra-ui/react';

export interface BaseCheckboxProps extends Omit<CheckboxProps, 'customIcon'> {
  label?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
}
