import React from 'react';

import { Theme, useTheme } from '@chakra-ui/react';
import {
  Props as SelectProps,
  Select as ChakraSelect
} from 'chakra-react-select';

import { GroupBase } from 'react-select/dist/declarations/src/types';

import { getSelectStyles } from 'shared/ui/components/Select/getSelectStyles';

export const Select = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  selectProps: Omit<SelectProps<Option, IsMulti, Group>, 'chakraStyles'>
) => {
  const theme = useTheme<Theme>();
  return (
    <ChakraSelect
      chakraStyles={getSelectStyles<Option, IsMulti, Group>(theme)}
      {...selectProps}
    />
  );
};
