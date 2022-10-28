import { createColumnHelper } from '@tanstack/react-table';

import { ProjectsCell } from '~/features/employees/Table/cells/ProjectsCell';
import { Employee } from '~/shared/store/api/employees/employees.types';

import { AddCVCell } from './cells/AddCVCell';
import { NameCell } from './cells/NameCell';
import { TranslatedHeader } from './cells/TranslatedHeader';

const columnHelper = createColumnHelper<Employee>();

export const EmployeesColumns = [
  columnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
    id: 'full_name',
    cell: NameCell,
    header: TranslatedHeader
  }),
  columnHelper.accessor('job_title', {
    cell: (info) => info.getValue(),
    header: TranslatedHeader
  }),
  columnHelper.accessor('city', {
    cell: (info) => info.getValue(),
    header: TranslatedHeader
  }),
  columnHelper.accessor('date_of_birth', {
    cell: (info) => info.getValue(),
    header: TranslatedHeader
  }),
  columnHelper.accessor('projects', {
    cell: ProjectsCell,
    header: TranslatedHeader
  }),
  columnHelper.accessor(() => 'cv', {
    id: 'cv',
    cell: AddCVCell,
    enableSorting: false,
    header: ''
  })
];
