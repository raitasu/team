import { Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { ProjectsFiltersDrawer } from '~/features/projects/Filters';
import { ProjectsFilterControl } from '~/features/projects/Filters/ProjectsFilterControl';
import { ProjectsTableContainer } from '~/features/projects/Tables';
import { ProjectsTable } from '~/features/projects/Tables/ProjectsTable';
import { PageContainer } from '~/shared/layout/Page/PageContainer';
import { PageToolbox } from '~/shared/layout/Page/PageToolbox';
import { ControlButton } from '~/shared/ui/components/IconButton/ControlButton';

export const Projects = () => {
  const [t] = useTranslation();

  return (
    <Flex>
      <PageContainer>
        <ProjectsTableContainer table={ProjectsTable} />
        <PageToolbox
          drawerControl={<ProjectsFilterControl />}
          drawerContent={<ProjectsFiltersDrawer />}
          action={
            <ControlButton
              aria-label={t('domains:projects.actions.add_project')}
              icon={<MdAdd />}
            />
          }
        />
      </PageContainer>
    </Flex>
  );
};
