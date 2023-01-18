import { ProgressBar } from '~/shared/ui/components/ProgressBar';

export const TableLoader = () => (
  <ProgressBar
    width="100%"
    height="100%"
    display="flex"
    backgroundColor="rgba(0, 0, 0, 0.05)"
    alignItems="center"
    justifyContent="center"
    position="absolute"
    zIndex="var(--chakra-zIndices-docked)"
    top={0}
    left={0}
    isIndeterminate
  />
);
