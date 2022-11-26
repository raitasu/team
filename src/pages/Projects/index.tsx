import { Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { ProjectsFiltersDrawer } from '~/features/projects/Filters';
import { createProjectsFilterControl } from '~/features/projects/Filters/ProjectsFilterControl';
import { PageContainer } from '~/shared/layout/Page/PageContainer';
import { PageToolbox } from '~/shared/layout/Page/PageToolbox';
import { ControlButton } from '~/shared/ui/components/IconButton/ControlButton';

export const Projects = () => {
  const [t] = useTranslation();

  return (
    <Flex>
      <PageContainer>Projects</PageContainer>
      <PageToolbox
        drawerControl={createProjectsFilterControl}
        drawerContent={<ProjectsFiltersDrawer />}
        action={
          <ControlButton
            aria-label={t('domains:projects.actions.add_project')}
            icon={<MdAdd />}
          />
        }
      />
    </Flex>
  );
};
