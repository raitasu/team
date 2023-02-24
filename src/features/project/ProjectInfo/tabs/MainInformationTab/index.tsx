import { Box } from '@chakra-ui/react';

import { EnvironmentInfo } from '~/features/project/ProjectInfo/tabs/MainInformationTab/EnvironmentInfo';
import { MainInfo } from '~/features/project/ProjectInfo/tabs/MainInformationTab/MainInfo';
import { type ProjectResponse } from '~/store/api/projects/projects.types';

export const MainInformationTab = ({
  project
}: {
  project: ProjectResponse;
}) => (
  <Box>
    <MainInfo project={project} />
    <EnvironmentInfo project={project} />
  </Box>
);
