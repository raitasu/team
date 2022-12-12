import React from 'react';

import { Table } from '@chakra-ui/react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { isAdmin } from '~/features/employee/employee.utils';
import { TableBody } from '~/features/employees/Tables/components/TableBody';
import { TableHeader } from '~/features/employees/Tables/components/TableHeader';
import { PositionsColumns } from '~/features/employees/Tables/PositionsTable/columns';
import { type EmployeesTable } from '~/features/employees/Tables/tables.types';
import { PagePaths } from '~/router/router.constants';
import { ConfirmationModal } from '~/shared/ui/components/ConfirmationModal';

export const EmployeesPositionsTable: EmployeesTable = ({
  data,
  employee,
  sorting,
  onSortingChange
}) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = React.useState<
    number | null
  >(null);
  const navigate = useNavigate();
  const [t] = useTranslation();

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
      <ConfirmationModal
        title={t('domains:employee.actions.create_cv')}
        description={t('domains:employee.actions.create_cv_confirmation')}
        isOpen={selectedEmployeeId !== null}
        onConfirm={() => {
          if (selectedEmployeeId !== null) {
            navigate(`${PagePaths.Employees}/${selectedEmployeeId}/add-cv`);
          }
        }}
        onClose={() => setSelectedEmployeeId(null)}
      />
    </>
  );
};
