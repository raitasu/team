import { Flex, Box, Text } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { useParams } from 'react-router-dom';

import { CVContainer } from '~/features/createCV/CV';
import { CVSideNav } from '~/features/createCV/sideNav/CVSideNav';
import { PageContainer } from '~/shared/layout/Page/PageContainer';
import { PageToolbox } from '~/shared/layout/Page/PageToolbox';
import { PageLoader } from '~/shared/ui/components/PageLoader';
import { useGetCVQuery } from '~/store/api/CV/cv.api.slice';

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
        gap="20px"
        mb={3}
      >
        <Box flex="0 0 240px" />
        <Box
          width="100%"
          textAlign="center"
        >
          <Text
            sx={{ textTransform: 'uppercase' }}
            fontSize="xl"
            fontWeight="900"
            as="span"
          >
            {data && data.name}
          </Text>
        </Box>
      </Flex>
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
