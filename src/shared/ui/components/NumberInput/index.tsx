import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputProps
} from '@chakra-ui/react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

export const BaseNumberInput = (props: NumberInputProps) => (
  <NumberInput {...props}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper>
        <MdKeyboardArrowUp size="20px" />
      </NumberIncrementStepper>
      <NumberDecrementStepper>
        <MdKeyboardArrowDown size="20px" />
      </NumberDecrementStepper>
    </NumberInputStepper>
  </NumberInput>
);
