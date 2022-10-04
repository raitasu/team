import React from 'react';

import { PlacementWithLogical, TooltipProps } from '@chakra-ui/react';

export interface BaseTooltipProps extends TooltipProps {
  labelText?: string;
  hasArrow?: boolean;
  ariaLabel?: string;
  sizeArrow?: number;
  place?: PlacementWithLogical | undefined;
  children: React.ReactNode;
  isOpened?: boolean;
}
