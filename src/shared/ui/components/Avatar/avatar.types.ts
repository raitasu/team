import { type AvatarProps as ChakraAvatarProps } from '@chakra-ui/react';

import { type EmployeeStatus } from '~/store/api/employees/employees.types';

export interface AvatarProps extends ChakraAvatarProps {
  src?: string;
  variant?: EmployeeStatus;
  size: 'sm' | 'md' | 'lg' | 'cv';
}

export type SizeType = {
  sm: {
    width: string;
    height: string;
    borderWeight: '1px' | '3px' | '10px';
  };
  md: {
    width: string;
    height: string;
    border: string;
  };
  lg: {
    width: string;
    height: string;
    borderWeight: '1px' | '3px' | '10px';
  };
  cv: {
    width: string;
    height: string;
  };
};
