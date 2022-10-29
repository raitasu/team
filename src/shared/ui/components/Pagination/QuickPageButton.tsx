import React from 'react';

import { IconButton } from '~/shared/ui/components/IconButton';

const styles = {
  _disabled: {
    boxShadow: 'none',
    color: 'brand.lightGray',
    cursor: 'not-allowed'
  },
  sx: {
    '&:hover:disabled': {
      boxShadow: 'none'
    }
  },
  boxShadow: 'none',
  bg: 'transparent'
};

export const QuickPageButton = ({
  areaLabel,
  onClick,
  isDisabled,
  icon
}: {
  areaLabel: string;
  onClick: () => void;
  isDisabled: boolean;
  icon: React.ReactElement;
}) => (
  <IconButton
    {...styles}
    aria-current
    aria-label={areaLabel}
    variant="iconButton"
    onClick={onClick}
    isDisabled={isDisabled}
    icon={icon}
  />
);
