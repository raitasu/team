import { createColumnHelper } from '@tanstack/react-table';

import { EmailCell } from '~/features/employees/Tables/cells/EmailCell';
import { PhoneCell } from '~/features/employees/Tables/cells/PhoneCell';
import { SocialNetworksCell } from '~/features/employees/Tables/cells/SocialNetworksCell';
import { TranslatedHeader } from '~/features/employees/Tables/cells/TranslatedHeader';
import { EmployeesHeaderIds } from '~/features/employees/Tables/tables.constants';
import type { ShortEmployee } from '~/shared/store/api/employees/employees.types';

import { NameCell } from '../cells/NameCell';

const columnHelper = createColumnHelper<ShortEmployee>();

export const ContactsColumns = [
  columnHelper.accessor((employee) => employee, {
    id: EmployeesHeaderIds.FullName,
    cell: NameCell,
    header: TranslatedHeader
  }),
  columnHelper.accessor('contacts', {
    id: EmployeesHeaderIds.Email,
    cell: EmailCell,
    enableSorting: false,
    header: TranslatedHeader
  }),
  columnHelper.accessor('contacts', {
    id: EmployeesHeaderIds.PrimaryPhone,
    cell: PhoneCell,
    enableSorting: false,
    header: TranslatedHeader
  }),
  columnHelper.accessor('social_networks', {
    id: EmployeesHeaderIds.SocialNetworks,
    cell: SocialNetworksCell,
    enableSorting: false,
    header: TranslatedHeader
  })
];
