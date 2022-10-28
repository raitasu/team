import { HeaderContext } from '@tanstack/table-core';
import { useTranslation } from 'react-i18next';

import { Employee } from '~/shared/store/api/employees/employees.types';

type HeaderKeys = Extract<
  keyof Employee,
  'name' | 'position' | 'location' | 'date' | 'projects'
>;

export const TranslatedHeader = <TData,>({
  column: { id }
}: HeaderContext<Employee, TData>) => {
  const [t] = useTranslation();

  return <span>{t(`titles:employees.table_headers.${id as HeaderKeys}`)}</span>;
};
