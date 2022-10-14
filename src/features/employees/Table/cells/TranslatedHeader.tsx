import { HeaderContext } from '@tanstack/table-core';
import { useTranslation } from 'react-i18next';

import { EmployeesTableRow } from '../table.types';

type HeaderKeys = Extract<
  keyof EmployeesTableRow,
  'name' | 'position' | 'location' | 'date' | 'projects'
>;

export const TranslatedHeader = ({
  column: { id }
}: HeaderContext<EmployeesTableRow, string>) => {
  const [t] = useTranslation();
  return <span>{t(`titles:employees.table_headers.${id as HeaderKeys}`)}</span>;
};
