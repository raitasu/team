import { Tooltip } from '@chakra-ui/react';

import { BaseTooltipProps } from './tooltip.types';

const defaultMotion = { variants: {} };

export const BaseTooltip = ({
  labelText = 'Enter text',
  hasArrow,
  ariaLabel = 'A Tooltip',
  sizeArrow = 12,
  place,
  children,
  isOpened,
  motionProps = defaultMotion,
  ...pathThroughProps
}: BaseTooltipProps) => (
  <Tooltip
    {...pathThroughProps}
    label={labelText}
    hasArrow={hasArrow}
    aria-label={ariaLabel}
    placement={place}
    arrowSize={sizeArrow}
    motionProps={motionProps}
    isOpen={isOpened}
  >
    {children}
  </Tooltip>
);
