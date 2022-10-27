import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper
} from '@chakra-ui/react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

export const NumberInput = (props: NumberInputProps) => (
  <ChakraNumberInput {...props}>
    <NumberInputField />
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
