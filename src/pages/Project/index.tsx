import { Box, Flex } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import isFinite from 'lodash/isFinite';
import { useParams } from 'react-router-dom';

import { isAdmin } from '~/features/employee/employee.utils';
import { ProjectCard } from '~/features/project/ProjectCard';
import { ProjectInfo } from '~/features/project/ProjectInfo';
import {
  COLUMN_GAP,
  containerStyles,
  PROFILE_COLUMN_WIDTH
} from '~/pages/Employee/employee.styles';
import { PageContainer } from '~/shared/layout/Page/PageContainer';
import { PageLoader } from '~/shared/ui/components/PageLoader';
import { selectLoggedInUser } from '~/store/api/authentication/authentication.selectors';
import { useGetProjectQuery } from '~/store/api/projects/projects.api';
import { useAppSelector } from '~/store/store.hooks';

export const Project = () => {
  const { id } = useParams();

  const {
    data: project,
    isLoading,
    isError
  } = useGetProjectQuery(id && isFinite(+id) ? +id : skipToken);
  const user = useAppSelector(selectLoggedInUser);

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

  const canEdit = isAdmin(user);

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
            <ProjectCard
              project={project}
              canEdit={canEdit}
            />
          </Box>
        </Flex>
        <Box
          flex="1"
          overflow="hidden"
          {...containerStyles}
        >
          <ProjectInfo
            project={project}
            canEdit={canEdit}
          />
        </Box>
      </Flex>
    </PageContainer>
  );
};
