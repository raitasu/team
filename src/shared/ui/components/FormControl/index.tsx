import {
  FormControl as ChakraFormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel
} from '@chakra-ui/react';

import { type BaseFormControlProps } from './formControl.types';

export const FormControl = ({
  label,
  helperText,
  errorMessage,
  children,
  ...passThroughProps
}: BaseFormControlProps) => (
  <ChakraFormControl
    {...passThroughProps}
    width="100%"
    isInvalid={Boolean(errorMessage)}
  >
    <FormLabel>{label}</FormLabel>

    {children}

    {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    {errorMessage ? <FormErrorMessage>{errorMessage}</FormErrorMessage> : null}
  </ChakraFormControl>
);
