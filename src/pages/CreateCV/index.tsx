import { Flex } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { useParams } from 'react-router-dom';

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

      <Flex gap="20px">
        <Flex
          flexGrow="0.5"
          flexDirection="column"
          alignItems="flex-start"
          padding="20px 14px"
          gap="10px"
          bgColor="white"
          border="1px solid var(--chakra-colors-brand-stroke)"
          borderRadius="4px"
        />
        <Flex
          flexGrow="1"
          border="1px solid var(--chakra-colors-brand-stroke)"
          borderRadius="4px"
          bgColor="white"
        >
          {data && JSON.stringify(data)}
          {error && JSON.stringify(error)}
        </Flex>
        <Flex
          flexGrow="1"
          border="1px solid var(--chakra-colors-brand-stroke)"
          borderRadius="4px"
          bgColor="white"
        />
      </Flex>
    </PageContainer>
  );
};
