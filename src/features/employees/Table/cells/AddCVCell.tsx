import { type CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { type ShortEmployee } from '~/shared/store/api/employees/employees.types';
import { Button } from '~/shared/ui/components/Button';

export const AddCVCell = ({
  table: {
    options: { meta }
  },
  row: { original: employee }
}: CellContext<ShortEmployee, undefined>) => {
  const [t] = useTranslation();

  return (
    <Button
      variant="primaryOutline"
      leftIcon={<MdAdd />}
      onClick={() => meta?.onAddCVBtnClick(employee.id)}
    >
      {t('titles:employees.cv')}
    </Button>
  );
};
