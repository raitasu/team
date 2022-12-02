import React from 'react';

import {
  type NumberInputFieldProps,
  type NumberInputProps,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputStepper
} from '@chakra-ui/react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

export const NumberInput = React.forwardRef<
  HTMLInputElement,
  NumberInputProps & {
    inputFieldProps?: Partial<NumberInputFieldProps>;
  }
>(({ inputFieldProps, ...props }, ref) => (
  <ChakraNumberInput {...props}>
    <NumberInputField
      ref={ref}
      {...inputFieldProps}
    />
    <NumberInputStepper>
      <NumberIncrementStepper>
        <MdKeyboardArrowUp size="20px" />
      </NumberIncrementStepper>
      <NumberDecrementStepper>
        <MdKeyboardArrowDown size="20px" />
      </NumberDecrementStepper>
    </NumberInputStepper>
  </ChakraNumberInput>
));
