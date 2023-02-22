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
  width = '100%',
  ...passThroughProps
}: BaseFormControlProps & { width?: string }) => (
  <ChakraFormControl
    {...passThroughProps}
    width={width}
    isInvalid={Boolean(errorMessage)}
  >
    {label ? <FormLabel>{label}</FormLabel> : null}

    {children}

    {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    {errorMessage ? <FormErrorMessage>{errorMessage}</FormErrorMessage> : null}
  </ChakraFormControl>
);
