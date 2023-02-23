import { type HeaderContext } from '@tanstack/table-core';
import { useTranslation } from 'react-i18next';

import { type GetCVListResponse } from '~/store/api/CV/cv.types';

import { type HeaderKeys } from '../CVTableInfo.types';

export const TranslatedHeader = <TData,>({
  column: { id }
}: HeaderContext<GetCVListResponse, TData>) => {
  const [t] = useTranslation();

  return (
    <span>
      {t(`domains:employee.table_headers.${id as HeaderKeys}`, { count: 100 })}
    </span>
  );
};
