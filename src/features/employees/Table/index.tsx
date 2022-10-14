import { Table } from '@chakra-ui/react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

import { EmployeesColumns } from './columns';
import { TableBody } from './components/TableBody';
import { TableHeader } from './components/TableHeader';
import { EmployeesTableRow } from './table.types';

export const EmployeesTable = ({ data }: { data: EmployeesTableRow[] }) => {
  const table = useReactTable({
    columns: EmployeesColumns,
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
