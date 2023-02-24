import { createColumnHelper } from '@tanstack/react-table';

import { AddCVCell } from '~/features/employees/Tables/cells/AddCVCell';
import { AddressCell } from '~/features/employees/Tables/cells/AddressCell';
import { BirthdayCell } from '~/features/employees/Tables/cells/BirthdayCell';
import { NameCell } from '~/features/employees/Tables/cells/NameCell';
import { PositionCell } from '~/features/employees/Tables/cells/PositionCell';
import { ProjectsCell } from '~/features/employees/Tables/cells/ProjectsCell';
import { TranslatedHeader } from '~/features/employees/Tables/cells/TranslatedHeader';
import { EmployeesHeaderIds } from '~/features/employees/Tables/tables.constants';
import { type ShortEmployee } from '~/store/api/employees/employees.types';

const columnHelper = createColumnHelper<ShortEmployee>();

export const PositionsColumns = [
  columnHelper.accessor((employee) => employee, {
    id: EmployeesHeaderIds.FullName,
    cell: NameCell,
    header: TranslatedHeader
  }),
  columnHelper.accessor('positions', {
    id: EmployeesHeaderIds.Positions,
    cell: PositionCell,
    header: TranslatedHeader,
    enableSorting: false
  }),
  columnHelper.accessor('contacts.address', {
    id: EmployeesHeaderIds.Contacts,
    cell: AddressCell,
    header: TranslatedHeader,
    enableSorting: true
  }),
  columnHelper.accessor('date_of_birth', {
    id: EmployeesHeaderIds.Birthday,
    cell: BirthdayCell,
    header: TranslatedHeader
  }),
  columnHelper.accessor('projects', {
    id: EmployeesHeaderIds.CurrentProjects,
    cell: ProjectsCell,
    header: TranslatedHeader,
    enableSorting: false
  }),
  columnHelper.accessor('id', {
    id: EmployeesHeaderIds.CV,
    cell: AddCVCell,
    enableSorting: false,
    header: ''
  })
];
