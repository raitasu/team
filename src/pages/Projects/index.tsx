import { Flex, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { isAdmin } from '~/features/employee/employee.utils';
import { CreateProjectModal } from '~/features/project/CreateProjectModal';
import { ProjectsFiltersDrawer } from '~/features/projects/Filters';
import { ProjectsFilterControl } from '~/features/projects/Filters/ProjectsFilterControl';
import { ProjectsTableContainer } from '~/features/projects/Tables';
import { ProjectsTable } from '~/features/projects/Tables/ProjectsTable';
import { PageContainer } from '~/shared/layout/Page/PageContainer';
import { PageToolbox } from '~/shared/layout/Page/PageToolbox';
import { ControlButton } from '~/shared/ui/components/IconButton/ControlButton';
import { selectLoggedInUser } from '~/store/api/authentication/authentication.selectors';
import { useAppSelector } from '~/store/store.hooks';

export const Projects = () => {
  const [t] = useTranslation();
  const user = useAppSelector(selectLoggedInUser);
  const hasAdminAccess = isAdmin(user);

  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose
  } = useDisclosure();

  return (
    <Flex>
      <PageContainer>
        <ProjectsTableContainer
          table={ProjectsTable}
          hasAdminAccess={hasAdminAccess}
        />
        {isCreateModalOpen && (
          <CreateProjectModal
            isOpen={isCreateModalOpen}
            onClose={onCreateModalClose}
          />
        )}
        <PageToolbox
          drawerControl={<ProjectsFilterControl />}
          drawerContent={<ProjectsFiltersDrawer />}
          action={
            hasAdminAccess ? (
              <ControlButton
                aria-label={t('domains:projects.actions.add_project')}
                icon={<MdAdd />}
                onClick={onCreateModalOpen}
              />
            ) : undefined
          }
        />
      </PageContainer>
    </Flex>
  );
};
