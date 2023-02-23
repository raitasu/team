import { Box, Flex } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query/react';
import isFinite from 'lodash/isFinite';
import { useParams } from 'react-router-dom';

import { isAdmin } from '~/features/employee/employee.utils';
import { EmployeeCard } from '~/features/employee/EmployeeCard';
import { EmployeeInfo } from '~/features/employee/EmployeeInfo';
import { PageContainer } from '~/shared/layout/Page/PageContainer';
import { PageLoader } from '~/shared/ui/components/PageLoader';
import { selectLoggedInUser } from '~/store/api/authentication/authentication.selectors';
import { useGetEmployeeQuery } from '~/store/api/employees/employees.api';
import { useAppSelector } from '~/store/store.hooks';

import {
  COLUMN_GAP,
  containerStyles,
  PROFILE_COLUMN_WIDTH
} from './employee.styles';

export const Employee = () => {
  const user = useAppSelector(selectLoggedInUser);
  const hasAdminAccess = isAdmin(user);
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
            <EmployeeCard employee={employee} />
          </Box>
        </Flex>
        <Box
          flex="1"
          overflow="hidden"
          {...containerStyles}
        >
          <EmployeeInfo
            employee={employee}
            hasAdminAccess={hasAdminAccess}
          />
        </Box>
      </Flex>
    </PageContainer>
  );
};
