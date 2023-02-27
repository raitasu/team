import { useState } from 'react';

import { Box, Img } from '@chakra-ui/react';
import { type CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { toastConfig } from '~/shared/shared.constants';
import { ConfirmationModal as ConfirmDeleteModal } from '~/shared/ui/components/ConfirmationModal';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { Tooltip } from '~/shared/ui/components/Tooltip';
import { useRemoveProjectMutation } from '~/store/api/projects/projects.api';
import { type ShortProject } from '~/store/api/projects/projects.types';

import connectIcon from '../assets/connect.svg';
import deleteIcon from '../assets/delete.svg';

export const ActionsCell = ({
  getValue
}: CellContext<ShortProject, ShortProject>) => {
  const project = getValue();
  const [t] = useTranslation();
  const [isOpenConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  const toastError = useErrorToast(toastConfig);
  const toastSuccess = useSuccessToast(toastConfig);

  const [removeProject, { isLoading: isLoadingDelete }] =
    useRemoveProjectMutation();

  const deleteProject = async () => {
    try {
      await removeProject(project.id);

      toastSuccess({
        description: t('domains:projects.actions.removed_project')
      });
      onCloseConfirmDeleteModal();
    } catch {
      toastError({
        description: t('domains:global.errors.descriptions.unknown_error')
      });
    }
  };

  const onCloseConfirmDeleteModal = () => {
    setOpenConfirmModal(false);
  };

  const onOpenConfirmDeleteModal = () => {
    setOpenConfirmModal(true);
  };

  return (
    <Box
      display="flex"
      gap={3}
    >
      <Img
        src={connectIcon}
        alt="Connect project"
        sx={{ cursor: 'pointer' }}
        onClick={() => project.id}
      />
      <Tooltip
        hasArrow
        place="top"
        labelText={t('general_actions:delete')}
      >
        <Img
          src={deleteIcon}
          alt="Delete project"
          sx={{ cursor: 'pointer' }}
          onClick={onOpenConfirmDeleteModal}
        />
      </Tooltip>
      <ConfirmDeleteModal
        title={t('domains:global.confirmations.titles.delete_project')}
        description={t(
          'domains:global.confirmations.descriptions.delete_project'
        )}
        onConfirm={deleteProject}
        isOpen={isOpenConfirmModal}
        onClose={onCloseConfirmDeleteModal}
        isLoading={isLoadingDelete}
      />
    </Box>
  );
};
