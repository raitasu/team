import { Flex } from '@chakra-ui/react';

import { Avatar } from '~/shared/ui/components/Avatar';
import { type Employee } from '~/store/api/employees/employees.types';

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
      src={
        employee.avatar
          ? `${import.meta.env.VITE_API_HOST}${employee.avatar}`
          : undefined
      }
    />
    <EmployeeDescription employee={employee} />
    {employee.role === 'admin' && <EmployeeCvControls />}
  </Flex>
);
