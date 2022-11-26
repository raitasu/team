import { type CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { Button } from '~/shared/ui/components/Button';
import { type ShortEmployee } from '~/store/api/employees/employees.types';

export const AddCVCell = ({
  table: {
    options: { meta }
  },
  getValue
}: CellContext<ShortEmployee, ShortEmployee['id']>) => {
  const [t] = useTranslation();

  return (
    <Button
      variant="primaryOutline"
      leftIcon={<MdAdd />}
      onClick={() => meta?.onAddCVBtnClick(getValue())}
    >
      {t('titles:employees.table_headers.cv')}
    </Button>
  );
};
