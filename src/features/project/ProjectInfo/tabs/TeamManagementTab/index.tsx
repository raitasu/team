import { Box } from '@chakra-ui/layout';
import { useTranslation } from 'react-i18next';

import { InfoSection } from '~/features/employee/EmployeeInfo/tabs/components/InfoSection';
import { type ProjectInfoTab } from '~/features/project/ProjectInfo/projectInfo.types';

import { tableWrapperStyle } from './tables/tables.styles';
import { TeamTable } from './tables/TeamTable/TeamTable';

export const TeamManagementTab: ProjectInfoTab = ({ project, canEdit }) => {
  const [t] = useTranslation();

  return (
    <InfoSection
      title={t('domains:projects.titles.project_tabs.team_management.team')}
      sx={{
        borderBottom: 'none'
      }}
      onAdd={canEdit ? () => console.debug('Add team') : undefined}
    >
      <Box {...tableWrapperStyle}>
        <TeamTable project={project} />
      </Box>
    </InfoSection>
  );
};
