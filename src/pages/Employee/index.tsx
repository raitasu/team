import { Box, Flex } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query/react';
import isFinite from 'lodash/isFinite';
import { useParams } from 'react-router-dom';

import { EmployeeCard } from '~/features/employee/EmployeeCard';
import { CvProfileList } from '~/features/employee/EmployeeCvList';
import { EmployeeInfo } from '~/features/employee/EmployeeInfo';
import { PageContainer } from '~/shared/layout/Page/PageContainer';
import { useGetEmployeeQuery } from '~/shared/store/api/employees/employees.api';
import { PageLoader } from '~/shared/ui/components/PageLoader';

import {
  COLUMN_GAP,
  PROFILE_COLUMN_WIDTH,
  containerStyles
} from './employee.styles';

export const Employee = () => {
  const { id } = useParams();
  const {
    data: employee,
    isLoading,
    isError
  } = useGetEmployeeQuery(id && isFinite(+id) ? +id : skipToken);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError || !employee) {
    return <div>Oops, something went wrong :(</div>;
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
            <EmployeeCard employee={employee} />
          </Box>
          <Box
            padding="20px 40px"
            {...containerStyles}
          >
            <CvProfileList />
          </Box>
        </Flex>
        <Box
          flex="1"
          overflow="hidden"
          {...containerStyles}
        >
          <EmployeeInfo employee={employee} />
        </Box>
      </Flex>
    </PageContainer>
  );
};
