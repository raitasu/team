import { Flex } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { useParams } from 'react-router-dom';

import { CVContainer } from '~/features/createCV/CV';
import { CVSideNav } from '~/features/createCV/sideNav/CVSideNav';
import { PageContainer } from '~/shared/layout/Page/PageContainer';
import { PageToolbox } from '~/shared/layout/Page/PageToolbox';
import { PageLoader } from '~/shared/ui/components/PageLoader';
import { useGetCVQuery } from '~/store/api/createCV/createCV.api';

export const CreateCV = () => {
  const { employeeId, cvId } = useParams();

  const { data, isLoading } = useGetCVQuery({
    employeeId: employeeId || String(skipToken),
    cvId: cvId || String(skipToken)
  });

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
        {data && <CVContainer cv={data} />}
      </Flex>
    </PageContainer>
  );
};
