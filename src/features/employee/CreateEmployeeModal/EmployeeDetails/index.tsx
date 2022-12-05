import { Flex } from '@chakra-ui/react';

import { EmployeeName } from '~/features/employee/CreateEmployeeModal/EmployeeDetails/EmployeeName';
import { EmployeePersonalEmail } from '~/features/employee/CreateEmployeeModal/EmployeeDetails/EmployeePersonalEmail';
import { EmployeeStatus } from '~/features/employee/CreateEmployeeModal/EmployeeDetails/EmployeeStatus';
import { EmployeeWorkEmail } from '~/features/employee/CreateEmployeeModal/EmployeeDetails/EmployeeWorkEmail';

export const EmployeeDetails = () => (
  <Flex
    flexDirection="column"
    gap="10px"
  >
    <EmployeeName />
    <EmployeeStatus />
    <EmployeeWorkEmail />
    <EmployeePersonalEmail />
  </Flex>
);
