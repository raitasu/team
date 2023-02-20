import { Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdDelete, MdLink } from 'react-icons/md';

import { isAdmin } from '~/features/employee/employee.utils';
import { borderColor } from '~/features/project/pojects.utils';
import { ProjectDescription } from '~/features/project/ProjectCard/ProjectDesciption';
import { Avatar } from '~/shared/ui/components/Avatar';
import { Button } from '~/shared/ui/components/Button';
import { Tooltip } from '~/shared/ui/components/Tooltip';
import { useGetCurrentUserQuery } from '~/store/api/authentication/authentication.api';
import { type ProjectResponse } from '~/store/api/projects/projects.types';

export const ProjectCard = ({ project }: { project: ProjectResponse }) => {
  const { t } = useTranslation();
  const { data: currentEmployee } = useGetCurrentUserQuery();

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
          size="lg"
          borderRadius="none"
          style={{
            border: `${borderColor(project.status)}`
          }}
        />
      </Tooltip>
      <ProjectDescription project={project} />
      {currentEmployee && isAdmin(currentEmployee) && (
        <Flex
          flexDirection="column"
          gap="10px"
        >
          <Button>{t(`domains:projects.actions.create_slide`)}</Button>
          <Button
            variant="primaryOutline"
            leftIcon={<MdLink />}
          >
            {t(`domains:projects.actions.copy_project`)}
          </Button>
          <Button
            variant="primaryOutline"
            leftIcon={<MdDelete />}
          >
            {t(`domains:projects.actions.delete_project`)}
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
