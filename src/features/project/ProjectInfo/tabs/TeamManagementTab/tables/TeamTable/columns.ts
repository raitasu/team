import { createColumnHelper } from '@tanstack/react-table';

import { type ProjectTeam } from '~/store/api/projects/projects.types';

import { ActionsCell } from './cells/ActionsCell';
import { DateCell } from './cells/DateCell';
import { NameCell } from './cells/NameCell';
import { PositonsCell } from './cells/PositionsCell';
import { TranslatedHeader } from './cells/TranslatedHeader';
import { TeamHeadersIds } from '../tables.constans';

const columnHelper = createColumnHelper<ProjectTeam>();

export const TeamColumns = [
  columnHelper.accessor((employee) => employee, {
    id: TeamHeadersIds.FullName,
    cell: NameCell,
    header: TranslatedHeader
  }),
  columnHelper.accessor((data) => data, {
    id: TeamHeadersIds.Positions,
    cell: PositonsCell,
    header: TranslatedHeader,
    enableSorting: false
  }),
  columnHelper.accessor((data) => data, {
    id: TeamHeadersIds.Date,
    cell: DateCell,
    header: TranslatedHeader,
    enableSorting: false
  }),
  columnHelper.accessor((data) => data, {
    id: TeamHeadersIds.Actions,
    cell: ActionsCell,
    header: TranslatedHeader
  })
];
