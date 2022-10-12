import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText
} from '@chakra-ui/react';

import { BaseFormControlProps } from './formControl.types';

export const BaseFormControl = ({
  label,
  helperText,
  errorMessage,
  children,
  ...passThroughProps
}: BaseFormControlProps) => (
  <FormControl
    {...passThroughProps}
    width="100%"
    isInvalid={Boolean(errorMessage)}
  >
    <FormLabel>{label}</FormLabel>

    {children}

    {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    {errorMessage ? <FormErrorMessage>{errorMessage}</FormErrorMessage> : null}
  </FormControl>
);
