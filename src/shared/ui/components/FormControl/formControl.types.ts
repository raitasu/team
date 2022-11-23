import { type FormControlProps } from '@chakra-ui/react';

export interface BaseFormControlProps extends FormControlProps {
  typeInput?: string;
  helperText?: string;
  errorMessage?: string;
  isError?: boolean;
}
