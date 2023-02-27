import { type HeaderContext } from '@tanstack/table-core';
import { useTranslation } from 'react-i18next';

import { type ProjectTeam } from '~/store/api/projects/projects.types';

import { type HeaderKeys } from '../TeamTable.types';

export const TranslatedHeader = <TData,>({
  column: { id }
}: HeaderContext<ProjectTeam, TData>) => {
  const [t] = useTranslation();

  return (
    <span>
      {t(`domains:employee.table_headers.${id as HeaderKeys}`, { count: 100 })}
    </span>
  );
};
