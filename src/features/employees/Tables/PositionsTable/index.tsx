import React from 'react';

import { Table } from '@chakra-ui/react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { isAdmin } from '~/features/employee/employee.utils';
import { TableBody } from '~/features/employees/Tables/components/TableBody';
import { TableHeader } from '~/features/employees/Tables/components/TableHeader';
import { PositionsColumns } from '~/features/employees/Tables/PositionsTable/columns';
import { type EmployeesTable } from '~/features/employees/Tables/tables.types';
import { CreateCVModal } from '~/shared/ui/components/CreateCVModal';

export const EmployeesPositionsTable: EmployeesTable = ({
  data,
  employee,
  sorting,
  onSortingChange
}) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = React.useState<
    number | null
  >(null);

  const table = useReactTable({
    columns: PositionsColumns,
    data,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    onSortingChange: (updater) =>
      onSortingChange(
        typeof updater === 'function' ? updater(sorting) : updater
      ),
    meta: {
      onAddCVBtnClick: (id) => {
        setSelectedEmployeeId(id);
      }
    },
    initialState: {
      columnVisibility: {
        cv: isAdmin(employee)
      }
    },
    state: {
      sorting
    }
  });

  return (
    <>
      <Table>
        <TableHeader headerGroups={table.getHeaderGroups()} />
        <TableBody rows={table.getRowModel().rows} />
      </Table>
      <CreateCVModal
        isOpen={selectedEmployeeId !== null}
        onClose={() => setSelectedEmployeeId(null)}
        employeeId={selectedEmployeeId}
      />
    </>
  );
};
