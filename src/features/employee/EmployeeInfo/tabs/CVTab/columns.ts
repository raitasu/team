import { createColumnHelper } from '@tanstack/react-table';
import { getI18n } from 'react-i18next';

import { DateFormats } from '~/shared/shared.constants';
import { getFormattedDate } from '~/shared/utils/dates.utils';
import { type GetCVListResponse } from '~/store/api/CV/cv.types';

import { ActionsCell } from './cells/ActionsCell';
import { TranslatedHeader } from './cells/TranslatedHeader';
import { CVsHeadersIds } from './CVTableInfo.constants';

const columnHelper = createColumnHelper<GetCVListResponse>();

export const CVsColumns = [
  columnHelper.accessor((cv) => cv, {
    id: CVsHeadersIds.Title,
    cell: (info) => (info.getValue().name ? info.getValue().name : 'CV name'),
    enableSorting: true,
    header: TranslatedHeader
  }),
  columnHelper.accessor((cv) => cv, {
    id: CVsHeadersIds.Positions,
    cell: (info) => info.getValue().positions,
    enableSorting: true,
    header: TranslatedHeader
  }),
  columnHelper.accessor((cv) => cv, {
    id: CVsHeadersIds.CreatedCv,
    cell: (info) =>
      getFormattedDate(
        info.getValue().created_at,
        getI18n().language,
        DateFormats.Simple
      ),
    enableSorting: true,
    header: TranslatedHeader
  }),
  columnHelper.accessor((cv) => cv, {
    id: CVsHeadersIds.Actions,
    cell: ActionsCell,
    enableSorting: false,
    header: TranslatedHeader,
    size: 140
  })
];
