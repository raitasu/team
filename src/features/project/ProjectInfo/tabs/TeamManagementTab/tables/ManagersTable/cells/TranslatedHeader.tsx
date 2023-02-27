import { type HeaderContext } from '@tanstack/table-core';
import { useTranslation } from 'react-i18next';

import { type HeaderKeys } from '~/features/employees/Tables/tables.types';
import { type ProjectManagers } from '~/store/api/projects/projects.types';

export const TranslatedHeader = <TData,>({
  column: { id }
}: HeaderContext<ProjectManagers, TData>) => {
  const [t] = useTranslation();

  return (
    <span>
      {t(`domains:employee.table_headers.${id as HeaderKeys}`, { count: 100 })}
    </span>
  );
};
