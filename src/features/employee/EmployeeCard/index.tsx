import { Flex } from '@chakra-ui/react';

import { type Employee } from '~/shared/store/api/employees/employees.types';
import { Avatar } from '~/shared/ui/components/Avatar';

import { EmployeeCvControls } from './EmployeeCvControls';
import { EmployeeDescription } from './EmployeeDescription';

export const EmployeeCard = ({ employee }: { employee: Employee }) => (
  <Flex
    flexDirection="column"
    gap="40px"
  >
    <Avatar
      size="lg"
      variant={employee.status}
      src={employee.avatar_url || undefined}
    />
    <EmployeeDescription employee={employee} />
    {employee.role === 'admin' && <EmployeeCvControls />}
  </Flex>
);
