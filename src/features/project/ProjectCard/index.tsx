import { Flex, useClipboard, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdDelete, MdLink } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { borderColor } from '~/features/project/pojects.utils';
import { ProjectDescription } from '~/features/project/ProjectCard/ProjectDesciption';
import { PagePaths } from '~/router/router.constants';
import { toastConfig } from '~/shared/shared.constants';
import { Avatar } from '~/shared/ui/components/Avatar';
import { Button } from '~/shared/ui/components/Button';
import { ConfirmationModal } from '~/shared/ui/components/ConfirmationModal';
import { useErrorToast } from '~/shared/ui/components/Toast';
import { Tooltip } from '~/shared/ui/components/Tooltip';
import { useRemoveProjectMutation } from '~/store/api/projects/projects.api';
import { type ProjectResponse } from '~/store/api/projects/projects.types';

export const ProjectCard = ({
  project,
  canEdit
}: {
  project: ProjectResponse;
  canEdit: boolean;
}) => {
  const { t } = useTranslation();
  const {
    isOpen: isDeletingProject,
    onOpen: requestConfirmation,
    onClose: denyRequest
  } = useDisclosure();
  const navigate = useNavigate();
  const { onCopy } = useClipboard(document.location.href);

  const toastError = useErrorToast(toastConfig);

  const [removeProject, { isLoading: isUpdating }] = useRemoveProjectMutation();

  const deleteProject = async () => {
    try {
      await removeProject(project.id);

      navigate(PagePaths.Projects);
    } catch {
      toastError({
        description: t('domains:global.errors.descriptions.unknown_error')
      });
    }
  };

  return (
    <Flex
      flexDirection="column"
      gap="40px"
    >
      <Tooltip
        hasArrow
        place="top"
        labelText={t(`domains:projects.status.${project.status}`)}
      >
        <Avatar
          src={
            project.avatar
              ? `${import.meta.env.VITE_API_HOST}${project.avatar}`
              : undefined
          }
          size="lg"
          borderRadius="none"
          style={{
            border: `${borderColor(project.status)}`
          }}
        />
      </Tooltip>
      <ProjectDescription project={project} />
      {canEdit && (
        <Flex
          flexDirection="column"
          gap="10px"
        >
          <Button
            variant="primaryOutline"
            leftIcon={<MdLink />}
            onClick={onCopy}
          >
            {t(`domains:projects.actions.copy_project`)}
          </Button>
          <Button
            variant="primaryOutline"
            leftIcon={<MdDelete />}
            onClick={requestConfirmation}
          >
            {t(`domains:projects.actions.delete_project`)}
          </Button>
          <ConfirmationModal
            title={t('domains:projects.actions.delete_project')}
            description={t(
              'domains:global.confirmations.descriptions.delete_project'
            )}
            isOpen={isDeletingProject}
            onClose={denyRequest}
            isLoading={isUpdating}
            onConfirm={async () => {
              try {
                await deleteProject();

                navigate(PagePaths.Projects);
              } catch {
                toastError({
                  description: t(
                    'domains:global.errors.descriptions.unknown_error'
                  )
                });
              }
            }}
          />
        </Flex>
      )}
    </Flex>
  );
};
