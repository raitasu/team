import { Flex } from '@chakra-ui/react';

import { isAdmin } from '~/features/employee/employee.utils';
import { Avatar } from '~/shared/ui/components/Avatar';
import { selectLoggedInUser } from '~/store/api/authentication/authentication.selectors';
import { type Employee } from '~/store/api/employees/employees.types';
import { useAppSelector } from '~/store/store.hooks';

import { EmployeeDescription } from './EmployeeDescription';
import { EmployeeProfileControls } from './EmployeeProfileControls';

export const EmployeeCard = ({ employee }: { employee: Employee }) => {
  const user = useAppSelector(selectLoggedInUser);

  return (
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
      {isAdmin(user) && <EmployeeProfileControls employee={employee} />}
    </Flex>
  );
};
