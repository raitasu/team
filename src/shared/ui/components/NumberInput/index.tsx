import type { NumberInputFieldProps, NumberInputProps } from '@chakra-ui/react';
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputStepper
} from '@chakra-ui/react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

export const NumberInput = ({
  inputFieldProps,
  ...props
}: NumberInputProps & { inputFieldProps?: Partial<NumberInputFieldProps> }) => (
  <ChakraNumberInput {...props}>
    <NumberInputField {...inputFieldProps} />
    <NumberInputStepper>
      <NumberIncrementStepper>
        <MdKeyboardArrowUp size="20px" />
      </NumberIncrementStepper>
      <NumberDecrementStepper>
        <MdKeyboardArrowDown size="20px" />
      </NumberDecrementStepper>
    </NumberInputStepper>
  </ChakraNumberInput>
);
