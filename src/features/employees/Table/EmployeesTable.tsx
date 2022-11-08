import React from 'react';

import { Table } from '@chakra-ui/react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { isAdmin } from '~/features/employee/employee.utils';
import { EmployeesColumns } from '~/features/employees/Table/columns';
import { AddCVModal } from '~/features/employees/Table/components/AddCVModal';
import type {
  Employee,
  ShortEmployee
} from '~/shared/store/api/employees/employees.types';

import { TableBody } from './components/TableBody';
import { TableHeader } from './components/TableHeader';

export const EmployeesTable = ({
  data,
  employee
}: {
  data: Array<ShortEmployee>;
  employee: Employee;
}) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = React.useState<
    number | null
  >(null);

  const table = useReactTable({
    columns: EmployeesColumns,
    data,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      onAddCVBtnClick: (id) => {
        setSelectedEmployeeId(id);
      }
    },
    initialState: {
      columnVisibility: {
        cv: isAdmin(employee)
      }
    }
  });

  return (
    <>
      <Table>
        <TableHeader headerGroups={table.getHeaderGroups()} />
        <TableBody rows={table.getRowModel().rows} />
      </Table>
      <AddCVModal
        employeeId={selectedEmployeeId}
        onClose={() => setSelectedEmployeeId(null)}
      />
    </>
  );
};
