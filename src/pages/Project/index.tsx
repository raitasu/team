import { Box, Flex } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import isFinite from 'lodash/isFinite';
import { useParams } from 'react-router-dom';

import { ProjectCard } from '~/features/project/ProjectCard';
import {
  COLUMN_GAP,
  containerStyles,
  PROFILE_COLUMN_WIDTH
} from '~/pages/Employee/employee.styles';
import { PageContainer } from '~/shared/layout/Page/PageContainer';
import { PageLoader } from '~/shared/ui/components/PageLoader';
import { useGetProjectQuery } from '~/store/api/projects/projects.api';

export const Project = () => {
  const { id } = useParams();

  const {
    data: project,
    isLoading,
    isError
  } = useGetProjectQuery(id && isFinite(+id) ? +id : skipToken);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError || !project) {
    return (
      <PageContainer>
        <div>Oops, something went wrong :(</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Flex
        gap={COLUMN_GAP}
        height="100%"
        overflow="hidden"
      >
        <Flex
          width={PROFILE_COLUMN_WIDTH}
          maxH="100%"
          gap={COLUMN_GAP}
          flexDirection="column"
          overflow="hidden"
        >
          <Box
            padding="40px"
            {...containerStyles}
          >
            <ProjectCard project={project} />
          </Box>
        </Flex>
        <Box
          flex="1"
          overflow="hidden"
          {...containerStyles}
        >
          Projects Info
        </Box>
      </Flex>
    </PageContainer>
  );
};
