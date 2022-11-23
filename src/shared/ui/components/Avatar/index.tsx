import React from 'react';

import { Avatar as ChakraAvatar } from '@chakra-ui/react';

import { type EmployeeStatus } from '~/shared/store/api/employees/employees.types';

import { type AvatarProps, type SizeType } from './avatar.types';
import defaultAvatar from './defaultAvatar.svg';

const sizes: SizeType = {
  sm: {
    width: '32px',
    height: '32px',
    borderWeight: '3px'
  },
  md: {
    width: '40px',
    height: '40px',
    border: '1px solid var(--chakra-colors-brand-body)'
  },
  lg: {
    width: '250px',
    height: '250px',
    borderWeight: '10px'
  }
};

const getSizeStyles = (
  borderValue: '1px' | '3px' | '10px',
  variant?: EmployeeStatus
) => {
  switch (variant) {
    case 'active':
      return {
        border: `${borderValue} solid var(--chakra-colors-brand-accentGreen)`
      };
    case 'candidate':
      return {
        border: `${borderValue} solid var(--chakra-colors-brand-accentYellow)`
      };
    case 'inactive':
      return {
        border: `${borderValue} solid var(--chakra-colors-brand-accentRed)`
      };
    default:
      return {
        border: `none`
      };
  }
};

const getStyles = (size: 'sm' | 'md' | 'lg', variant?: EmployeeStatus) => {
  switch (size) {
    case 'sm':
      return {
        ...sizes[size],
        ...getSizeStyles(sizes.sm.borderWeight, variant)
      };
    case 'md':
      return sizes[size];

    case 'lg':
      return {
        ...sizes[size],
        ...getSizeStyles(sizes.lg.borderWeight, variant)
      };
    default:
      return {};
  }
};

export const Avatar = React.forwardRef<
  HTMLSpanElement,
  Omit<AvatarProps, 'bg'>
>(({ src, variant, size, ...passThroughProps }, ref) => (
  <ChakraAvatar
    {...passThroughProps}
    ref={ref}
    bg="brand.stroke"
    src={src || defaultAvatar}
    sx={getStyles(size, variant)}
  />
));
