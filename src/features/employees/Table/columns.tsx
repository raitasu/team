import { createColumnHelper } from '@tanstack/react-table';

import { AddCVCell } from './cells/AddCVCell';
import { NameCell } from './cells/NameCell';
import { TranslatedHeader } from './cells/TranslatedHeader';
import { EmployeesTableRow } from './table.types';

const columnHelper = createColumnHelper<EmployeesTableRow>();

export const EmployeesColumns = [
  columnHelper.accessor('name', {
    cell: NameCell,
    header: TranslatedHeader
  }),
  columnHelper.accessor('position', {
    cell: (info) => info.getValue(),
    header: TranslatedHeader
  }),
  columnHelper.accessor('location', {
    cell: (info) => info.getValue(),
    header: TranslatedHeader
  }),
  columnHelper.accessor('date', {
    cell: (info) => info.getValue(),
    header: TranslatedHeader
  }),
  columnHelper.accessor('projects', {
    cell: (info) => info.getValue(),
    header: TranslatedHeader
  }),
  columnHelper.accessor('cv', {
    cell: AddCVCell,
    enableSorting: false,
    header: ''
  })
];
