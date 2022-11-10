import React from 'react';

import { Table } from '@chakra-ui/react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { isAdmin } from '~/features/employee/employee.utils';
import { EmployeesColumns } from '~/features/employees/Table/columns';
import { PagePaths } from '~/router/router.constants';
import type {
  Employee,
  ShortEmployee
} from '~/shared/store/api/employees/employees.types';
import { ConfirmationModal } from '~/shared/ui/components/ConfirmationModal';

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
  const navigate = useNavigate();
  const [t] = useTranslation();

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
      <ConfirmationModal
        title={t('actions:general.create_cv')}
        description={t('titles:employees.create_cv_description')}
        isOpen={selectedEmployeeId !== null}
        onConfirm={() =>
          navigate(`${PagePaths.Employees}/${employee.id}/add-cv`)
        }
        onClose={() => setSelectedEmployeeId(null)}
      />
    </>
  );
};
