import { type HeaderContext } from '@tanstack/table-core';
import { useTranslation } from 'react-i18next';

import { type ShortEmployee } from '~/shared/store/api/employees/employees.types';

type HeaderKeys =
  | 'contacts'
  | 'date_of_birth'
  | 'full_name'
  | 'positions'
  | 'projects';

export const TranslatedHeader = <TData,>({
  column: { id }
}: HeaderContext<ShortEmployee, TData>) => {
  const [t] = useTranslation();

  return <span>{t(`titles:employees.table_headers.${id as HeaderKeys}`)}</span>;
};
