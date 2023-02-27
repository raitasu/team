import { useState } from 'react';

import { Table } from '@chakra-ui/react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { toastConfig } from '~/shared/shared.constants';
import { ConfirmationModal as ConfirmDeleteModal } from '~/shared/ui/components/ConfirmationModal';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { useRemoveManagerMutation } from '~/store/api/projects/projects.api';
import { type ProjectResponse } from '~/store/api/projects/projects.types';

import { ManagersColumns } from './columns';
import { ManagersTableBody as TableBody } from './components/ManagersTableBody';
import { ManagersTableHeader as TableHeader } from './components/ManagersTableHeader';

export const ManagersTable = ({ project }: { project: ProjectResponse }) => {
  const [t] = useTranslation();
  const [deleteManagerId, setDeleteManagerId] = useState<number | null>(null);

  const errorToast = useErrorToast(toastConfig);
  const successToast = useSuccessToast(toastConfig);

  const [removeManager, { isLoading }] = useRemoveManagerMutation();

  const table = useReactTable({
    columns: ManagersColumns,
    data: project.managers,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      onDeleteManager: (id: number) => {
        setDeleteManagerId(id);
      }
    }
  });

  const onDeleteManager = async () => {
    if (deleteManagerId === null) {
      return;
    }

    setDeleteManagerId(null);

    try {
      await removeManager({
        projectId: project.id,
        id: deleteManagerId
      }).unwrap();
      successToast({
        description: t('domains:global.confirmations.descriptions.deleted')
      });
      setDeleteManagerId(null);
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
        title={t('domains:global.confirmations.titles.delete_manager')}
        description={t(
          'domains:global.confirmations.descriptions.delete_manager'
        )}
        onConfirm={onDeleteManager}
        isOpen={deleteManagerId !== null}
        onClose={() => setDeleteManagerId(null)}
        isLoading={isLoading}
      />
    </>
  );
};
