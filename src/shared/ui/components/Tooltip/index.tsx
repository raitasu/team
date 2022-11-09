import { Tooltip as ChakraTooltip } from '@chakra-ui/react';

import type { BaseTooltipProps } from './tooltip.types';

const defaultMotion = { variants: {} };

export const Tooltip = ({
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
  <ChakraTooltip
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
  </ChakraTooltip>
);
