import React from 'react';

import { Size, Select as ChakraSelect } from 'chakra-react-select';

import { selectStyles } from './select.styles';

export const Select = (props: {
  isMulti?: boolean;
  options: Array<{
    value: string;
    label: string;
  }>;
  size?: Size;
}) => {
  const { isMulti, options, size } = props;

  return (
    <ChakraSelect
      isMulti={isMulti}
      chakraStyles={selectStyles}
      options={options}
      size={size}
    />
  );
};
