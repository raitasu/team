import React from 'react';

import {
  ChakraStylesConfig,
  Props as SelectProps,
  Select as ChakraSelect
} from 'chakra-react-select';

import { SelectStyles } from 'shared/ui/components/Select/select.styles';

export const Select = <Option, IsMulti extends boolean = false>(
  selectProps: Omit<SelectProps<Option, IsMulti>, 'chakraStyles'>
) => (
  <ChakraSelect
    chakraStyles={SelectStyles as ChakraStylesConfig<Option, IsMulti>}
    {...selectProps}
  />
);
