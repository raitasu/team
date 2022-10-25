import { ProgressBar } from '~/shared/ui/components/ProgressBar';

export const PageLoader = () => (
  <ProgressBar
    width="100%"
    height="100%"
    display="flex"
    alignItems="center"
    justifyContent="center"
    position="fixed"
    top={0}
    left={0}
    isIndeterminate
  />
);
