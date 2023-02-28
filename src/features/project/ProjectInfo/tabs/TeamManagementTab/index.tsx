import { Box } from '@chakra-ui/layout';
import { useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { InfoSection } from '~/features/employee/EmployeeInfo/tabs/components/InfoSection';
import { type ProjectInfoTab } from '~/features/project/ProjectInfo/projectInfo.types';
import { AddNewEmployeeToTeamModal } from '~/features/project/ProjectInfo/tabs/TeamManagementTab/modals/AddNewEmployeeToTeam/AddNewEmployeeToTeamModal';
import { toastConfig } from '~/shared/shared.constants';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { type CreateEmployeeProjects } from '~/store/api/employees/employees.types';
import { useAddNewEmployeeMutation } from '~/store/api/projects/projects.api';

import { tableWrapperStyle } from './tables/tables.styles';
import { TeamTable } from './tables/TeamTable/TeamTable';

export const TeamManagementTab: ProjectInfoTab = ({ project, canEdit }) => {
  const [t] = useTranslation();

  const [addNewEmployee, { isLoading }] = useAddNewEmployeeMutation();
  const {
    isOpen: isOpenTeamTab,
    onOpen: onOpenTeamTab,
    onClose: onCloseTeamTab
  } = useDisclosure();
  const errorToast = useErrorToast(toastConfig);

  const successToast = useSuccessToast(toastConfig);
  const addNewEmployeeToTeam = async (values: CreateEmployeeProjects) => {
    try {
      await addNewEmployee({ data: values, projectId: project.id }).unwrap();
      onCloseTeamTab();
      successToast({
        description: t('domains:global.confirmations.descriptions.saved')
      });
    } catch (e) {
      console.error(e);
      errorToast({
        description: t('domains:global.errors.descriptions.unknown_error')
      });
    }
  };

  return (
    <InfoSection
      title={t('domains:projects.titles.project_tabs.team_management.team')}
      sx={{
        borderBottom: 'none'
      }}
      onAdd={canEdit ? onOpenTeamTab : undefined}
    >
      <Box {...tableWrapperStyle}>
        <TeamTable project={project} />
        <AddNewEmployeeToTeamModal
          project={project}
          isOpenTeamTab={isOpenTeamTab}
          onCloseTeamTab={onCloseTeamTab}
          onConfirm={addNewEmployeeToTeam}
          isLoading={isLoading}
        />
      </Box>
    </InfoSection>
  );
};
