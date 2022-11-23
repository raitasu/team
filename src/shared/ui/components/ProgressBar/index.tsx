import {
  type CircularProgressProps,
  CircularProgress,
  CircularProgressLabel
} from '@chakra-ui/react';

export const ProgressBar = ({
  value,
  size = '80px',
  thickness = '8px',
  valueText,
  ...passThroughProps
}: CircularProgressProps) => (
  <CircularProgress
    {...passThroughProps}
    value={value}
    size={size}
    color="brand.ghostGray"
    trackColor="brand.stroke"
    thickness={thickness}
  >
    <CircularProgressLabel>{valueText}</CircularProgressLabel>
  </CircularProgress>
);
