import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

import { ProgressProps } from './proggress.types';

export const ProgressBar = ({
  value,
  size,
  label,
  thickness
}: ProgressProps) => (
  <CircularProgress
    value={value}
    size={size}
    color="brand.ghostGray"
    trackColor="brand.stroke"
    thickness={thickness}
  >
    <CircularProgressLabel>{label}</CircularProgressLabel>
  </CircularProgress>
);
