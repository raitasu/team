import { Table } from '@chakra-ui/react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { TableBody } from '~/features/employees/Tables/components/TableBody';
import { TableHeader } from '~/features/employees/Tables/components/TableHeader';
import { ContactsColumns } from '~/features/employees/Tables/ContactsTable/collumns';
import { type EmployeesTable } from '~/features/employees/Tables/tables.types';

export const EmployeesContactsTable: EmployeesTable = ({ data }) => {
  const table = useReactTable({
    columns: ContactsColumns,
    data,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <Table>
      <TableHeader headerGroups={table.getHeaderGroups()} />
      <TableBody rows={table.getRowModel().rows} />
    </Table>
  );
};
