import { useState } from 'react';

import { Table } from '@chakra-ui/react';
import {
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable
} from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { toastConfig } from '~/shared/shared.constants';
import { ConfirmationModal as ConfirmDeleteModal } from '~/shared/ui/components/ConfirmationModal';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { useDeleteCVMutation } from '~/store/api/CV/cv.api.slice';

import { CVsColumns } from './columns';
import { CVTableBody as TableBody } from './components/CVTableBody';
import { CVTableHeader as TableHeader } from './components/CVTableHeader';
import { type CVsTable } from './CVTableInfo.types';

export const CVTableInfo: CVsTable = ({ data, employee }) => {
  const [t] = useTranslation();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [deleteCvId, setDeleteCVId] = useState<number | null>(null);
  const errorToast = useErrorToast(toastConfig);
  const successToast = useSuccessToast(toastConfig);
  const [deleteCV, { isLoading: isUpdating }] = useDeleteCVMutation();

  const table = useReactTable({
    columns: CVsColumns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting
    },
    meta: {
      employee,
      onDeleteCV: (id) => {
        setDeleteCVId(id);
      }
    }
  });

  const onDeleteCV = async () => {
    if (deleteCvId === null) {
      return;
    }

    try {
      await deleteCV({
        employeeId: employee.id,
        id: deleteCvId
      }).unwrap();
      successToast({
        description: t('domains:global.confirmations.descriptions.deleted')
      });
      setDeleteCVId(null);
    } catch (e) {
      console.error(e);
      errorToast({
        description: t('domains:global.errors.descriptions.unknown_error')
      });
    }
  };

  return (
    <>
      <Table>
        <TableHeader headerGroups={table.getHeaderGroups()} />
        <TableBody rows={table.getRowModel().rows} />
      </Table>

      <ConfirmDeleteModal
        title={t('domains:global.confirmations.titles.delete_cv')}
        description={t('domains:global.confirmations.descriptions.delete_cv')}
        onConfirm={onDeleteCV}
        isOpen={deleteCvId !== null}
        onClose={() => setDeleteCVId(null)}
        isLoading={isUpdating}
      />
    </>
  );
};
