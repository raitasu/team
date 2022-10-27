import { Table } from '@chakra-ui/react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { Employee } from '~/shared/store/api/api.types';

import { EmployeesColumns } from './columns';
import { TableBody } from './components/TableBody';
import { TableHeader } from './components/TableHeader';

export const EmployeesTable = ({ data }: { data: Array<Employee> }) => {
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
