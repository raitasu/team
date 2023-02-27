import { createColumnHelper } from '@tanstack/react-table';

import { type ProjectManagers } from '~/store/api/projects/projects.types';

import { ActionsCell } from './cells/ActionsCell';
import { NameCell } from './cells/NameCell';
import { TranslatedHeader } from './cells/TranslatedHeader';
import { TeamHeadersIds } from '../tables.constans';

const columnHelper = createColumnHelper<ProjectManagers>();

export const ManagersColumns = [
  columnHelper.accessor((manager) => manager, {
    id: TeamHeadersIds.FullName,
    cell: NameCell,
    header: TranslatedHeader
  }),
  columnHelper.accessor((data) => data, {
    id: TeamHeadersIds.Actions,
    cell: ActionsCell,
    header: TranslatedHeader
  })
];
