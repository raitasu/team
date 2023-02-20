import { Flex, Box } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { useParams } from 'react-router-dom';

import { CVSideNav } from '~/features/createCV/sideNav/CVSideNav';
import { PageContainer } from '~/shared/layout/Page/PageContainer';
import { PageToolbox } from '~/shared/layout/Page/PageToolbox';
import { PageLoader } from '~/shared/ui/components/PageLoader';
import { useGetEmployeeQuery } from '~/store/api/employees/employees.api';

export const CreateCV = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useGetEmployeeQuery(id ? +id : skipToken);

  return (
    <PageContainer>
      <PageToolbox />
      {isLoading && <PageLoader />}
      <Flex
        width="100%"
        overflow="auto"
        gap="20px"
        height="100%"
        alignItems="top"
      >
        <CVSideNav />
        <Box>
          {data && JSON.stringify(data)}
          {error && JSON.stringify(error)}
        </Box>
      </Flex>
    </PageContainer>
  );
};
