import { Avatar as ChakraAvatar } from '@chakra-ui/react';

import { AvatarProps, EmployeeStatus, SizeType } from './avatar.types';

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
  variant: EmployeeStatus,
  borderValue: '1px' | '3px' | '10px'
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
        border: `${borderValue} solid var(--chakra-colors-brand-accentYellow)`
      };
  }
};

const getStyles = (variant: EmployeeStatus, size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm':
      return {
        ...sizes[size],
        ...getSizeStyles(variant, sizes.sm.borderWeight)
      };
    case 'md':
      return sizes[size];

    case 'lg':
      return {
        ...sizes[size],
        ...getSizeStyles(variant, sizes.lg.borderWeight)
      };
    default:
      return {};
  }
};

export const Avatar = ({
  src,
  variant,
  size,
  ...passThroughProps
}: Omit<AvatarProps, 'bg'>) => (
  <ChakraAvatar
    {...passThroughProps}
    bg="brand.stroke"
    src={src || defaultAvatar}
    sx={getStyles(variant, size)}
  />
);
