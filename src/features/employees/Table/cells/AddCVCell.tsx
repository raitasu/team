import { MdAdd } from 'react-icons/md';

import { Button } from '~/shared/ui/components/Button';

export const AddCVCell = () => (
  <Button
    variant="primaryOutline"
    leftIcon={<MdAdd />}
  >
    CV
  </Button>
);
