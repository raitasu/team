import {
  CircularProgress,
  CircularProgressLabel,
  CircularProgressProps
} from '@chakra-ui/react';

export const ProgressBar = ({
  value,
  size = '80px',
  thickness = '8px',
  valueText,
  ...passThroughProps
}: CircularProgressProps) => (
  <CircularProgress
    value={value}
    size={size}
    color="brand.ghostGray"
    trackColor="brand.stroke"
    thickness={thickness}
    {...passThroughProps}
  >
    <CircularProgressLabel>{valueText}</CircularProgressLabel>
  </CircularProgress>
);
