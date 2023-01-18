import { createColumnHelper } from '@tanstack/react-table';

import { ActionsCell } from '~/features/projects/Tables/cells/ActionsCell';
import { CompanyNameCell } from '~/features/projects/Tables/cells/CompanyNameCell';
import { ProjectCell } from '~/features/projects/Tables/cells/ProjectCell';
import { StatusCell } from '~/features/projects/Tables/cells/StatusCell';
import { TeamCell } from '~/features/projects/Tables/cells/TeamCell';
import { TranslatedHeader } from '~/features/projects/Tables/cells/TranslatedHeader';
import { TypeCell } from '~/features/projects/Tables/cells/TypeCell';
import { ProjectsHeaderIds } from '~/features/projects/Tables/tables.constants';
import { type Project } from '~/store/api/projects/projects.types';

const columnHelper = createColumnHelper<Project>();

export const PositionsColumns = [
  columnHelper.accessor((project) => project, {
    id: ProjectsHeaderIds.CompanyName,
    cell: CompanyNameCell,
    header: TranslatedHeader
  }),
  columnHelper.accessor((project) => project, {
    id: ProjectsHeaderIds.ProjectName,
    cell: ProjectCell,
    header: TranslatedHeader
  }),
  columnHelper.accessor((project) => project, {
    id: ProjectsHeaderIds.Status,
    cell: StatusCell,
    header: TranslatedHeader
  }),
  columnHelper.accessor((project) => project, {
    id: ProjectsHeaderIds.Type,
    cell: TypeCell,
    header: TranslatedHeader
  }),
  columnHelper.accessor((project) => project, {
    id: ProjectsHeaderIds.Team,
    cell: TeamCell,
    header: TranslatedHeader
  }),
  columnHelper.accessor((project) => project, {
    id: ProjectsHeaderIds.Actions,
    cell: ActionsCell,
    header: TranslatedHeader
  })
];
