import { type HeaderContext } from '@tanstack/table-core';
import { useTranslation } from 'react-i18next';

import { type HeaderKeys } from '~/features/employees/Tables/tables.types';
import { type ShortEmployee } from '~/store/api/employees/employees.types';

export const TranslatedHeader = <TData,>({
  column: { id }
}: HeaderContext<ShortEmployee, TData>) => {
  const [t] = useTranslation();

  return <span>{t(`titles:employees.table_headers.${id as HeaderKeys}`)}</span>;
};
