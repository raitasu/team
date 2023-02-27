import { Box } from '@chakra-ui/react';

import { type ProjectInfoTab } from '~/features/project/ProjectInfo/projectInfo.types';
import { EnvironmentInfo } from '~/features/project/ProjectInfo/tabs/MainInformationTab/EnvironmentInfo';
import { MainInfo } from '~/features/project/ProjectInfo/tabs/MainInformationTab/MainInfo';

export const MainInformationTab: ProjectInfoTab = ({ project, canEdit }) => (
  <Box>
    <MainInfo
      project={project}
      canEdit={canEdit}
    />
    <EnvironmentInfo
      project={project}
      canEdit={canEdit}
    />
  </Box>
);
