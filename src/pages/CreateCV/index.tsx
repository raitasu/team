import { Box, Text } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { useParams } from 'react-router-dom';

import { CVForm } from '~/features/createCV';
import {
  COLUMN_GAP,
  PROFILE_COLUMN_WIDTH
} from '~/pages/Employee/employee.styles';
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
      {data && <CVForm cv={data} />}
    </PageContainer>
  );
};
