import { type HeaderContext } from '@tanstack/table-core';
import { useTranslation } from 'react-i18next';

import { type HeaderKeys } from '~/features/projects/Tables/tables.types';
import { type ShortProject } from '~/store/api/projects/projects.types';

export const TranslatedHeader = <TData,>({
  column: { id }
}: HeaderContext<ShortProject, TData>) => {
  const [t] = useTranslation();

  return (
    <span>
      {t(`domains:projects.table_headers.${id as HeaderKeys}`, { count: 100 })}
    </span>
  );
};
