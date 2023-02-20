import { Flex, useDisclosure } from '@chakra-ui/react';

import { isAdmin } from '~/features/employee/employee.utils';
import { Avatar } from '~/shared/ui/components/Avatar';
import { CreateCVModal } from '~/shared/ui/components/CreateCVModal';
import { type Employee } from '~/store/api/employees/employees.types';

import { EmployeeCvControls } from './EmployeeCvControls';
import { EmployeeDescription } from './EmployeeDescription';

export const EmployeeCard = ({ employee }: { employee: Employee }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      {isAdmin(employee) && <EmployeeCvControls onCreate={onOpen} />}
      <CreateCVModal
        isOpen={isOpen}
        onClose={onClose}
        employeeId={employee.id}
      />
    </Flex>
  );
};
