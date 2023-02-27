import { useState } from 'react';

import { Table } from '@chakra-ui/react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { toastConfig } from '~/shared/shared.constants';
import { ConfirmationModal as ConfirmDeleteModal } from '~/shared/ui/components/ConfirmationModal';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { useRemoveEmployeeMutation } from '~/store/api/projects/projects.api';
import { type ProjectResponse } from '~/store/api/projects/projects.types';

import { TeamColumns } from './columns';
import { TeamTableBody as TableBody } from './components/TeamTableBody';
import { TeamTableHeader as TableHeader } from './components/TeamTableHeader';

export const TeamTable = ({ project }: { project: ProjectResponse }) => {
  const [t] = useTranslation();
  const [editMemberTeam, setEditMemberTeam] = useState<number | null>(null);
  const [deleteMemberTeam, setDeleteMemberTeam] = useState<number[] | null>(
    null
  );
  const errorToast = useErrorToast(toastConfig);
  const successToast = useSuccessToast(toastConfig);
  const [removeEmployee, { isLoading }] = useRemoveEmployeeMutation();

  const table = useReactTable({
    columns: TeamColumns,
    data: project.team,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      onEditMemberTeam: (id) => {
        setEditMemberTeam(id);
      },
      onDeleteMemberTeam: (id) => {
        setDeleteMemberTeam(id);
      }
    }
  });

  const onDeleteMemberTeam = async () => {
    if (deleteMemberTeam === null) {
      return;
    }

    setDeleteMemberTeam(null);

    try {
      await removeEmployee({
        projectId: project.id,
        id: deleteMemberTeam
      }).unwrap();
      successToast({
        description: t('domains:global.confirmations.descriptions.deleted')
      });
      setDeleteMemberTeam(null);
    } catch (e) {
      console.error(e);
      errorToast({
        description: t('domains:global.errors.descriptions.unknown_error')
      });
    }
  };

  console.debug(editMemberTeam, 'editMemberTeam');

  return (
    <>
      <Table>
        <TableHeader headerGroups={table.getHeaderGroups()} />
        <TableBody rows={table.getRowModel().rows} />
      </Table>

      <ConfirmDeleteModal
        title={t('domains:global.confirmations.titles.delete_member')}
        description={t(
          'domains:global.confirmations.descriptions.delete_member'
        )}
        onConfirm={onDeleteMemberTeam}
        isOpen={deleteMemberTeam !== null}
        onClose={() => setDeleteMemberTeam(null)}
        isLoading={isLoading}
      />
    </>
  );
};
