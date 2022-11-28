import { Flex } from '@chakra-ui/react';

import { EmployeeEmail } from '~/features/employee/CreateEmployeeModal/EmployeeDetails/EmployeeEmail';
import { EmployeeName } from '~/features/employee/CreateEmployeeModal/EmployeeDetails/EmployeeName';
import { EmployeeStatus } from '~/features/employee/CreateEmployeeModal/EmployeeDetails/EmployeeStatus';

export const EmployeeDetails = () => (
  <Flex
    flexDirection="column"
    gap="10px"
  >
    <EmployeeName />
    <EmployeeStatus />
    <EmployeeEmail />
  </Flex>
);
