import { Flex, Box, Text } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { useParams } from 'react-router-dom';

import { CVContainer } from '~/features/createCV/CV';
import { CVSideNav } from '~/features/createCV/sideNav/CVSideNav';
import { PageContainer } from '~/shared/layout/Page/PageContainer';
import { PageToolbox } from '~/shared/layout/Page/PageToolbox';
import { PageLoader } from '~/shared/ui/components/PageLoader';
import { useGetCVQuery } from '~/store/api/CV/cv.api.slice';

import { COLUMN_GAP, PROFILE_COLUMN_WIDTH } from '../Employee/employee.styles';

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
      <Box
        textAlign="center"
        ml={`calc(${PROFILE_COLUMN_WIDTH} + ${COLUMN_GAP})`}
        pb="10px"
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
      <Flex
        overflow="hidden"
        flexGrow={1}
        gap={COLUMN_GAP}
      >
        <Flex
          width={PROFILE_COLUMN_WIDTH}
          maxH="100%"
          gap={COLUMN_GAP}
          flexDirection="column"
          overflow="hidden"
        >
          <CVSideNav />
        </Flex>
        <Flex
          flex="1"
          overflow="auto"
        >
          {data && <CVContainer cv={data} />}
        </Flex>
      </Flex>
    </PageContainer>
  );
};
