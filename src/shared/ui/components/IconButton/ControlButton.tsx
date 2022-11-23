import React from 'react';

import { type IconButtonProps } from '@chakra-ui/react';

import { IconButton } from '~/shared/ui/components/IconButton/index';

const styles = {
  _disabled: {
    boxShadow: 'none',
    color: 'brand.lightGray',
    cursor: 'not-allowed'
  },
  _active: {
    boxShadow: 'none'
  },
  _hover: {
    boxShadow: 'none'
  },
  boxShadow: 'none',
  bg: 'transparent'
};

export const ControlButton = React.forwardRef<
  HTMLButtonElement,
  {
    onClick?: () => void;
    isDisabled?: boolean;
    icon: React.ReactElement;
  } & Omit<IconButtonProps, 'size' | 'sx'>
>(({ onClick, isDisabled, icon, ...passThroughProps }, ref) => (
  <IconButton
    {...passThroughProps}
    sx={styles}
    ref={ref}
    aria-current
    variant="iconButton"
    onClick={onClick}
    isDisabled={isDisabled}
    icon={icon}
  />
));
