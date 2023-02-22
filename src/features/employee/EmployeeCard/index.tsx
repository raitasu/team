import { Flex, useDisclosure } from '@chakra-ui/react';

import { isAdmin } from '~/features/employee/employee.utils';
import { Avatar } from '~/shared/ui/components/Avatar';
import { CreateCVModal } from '~/shared/ui/components/CreateCVModal';
import { selectCurrentEmployee } from '~/store/api/employees/employees.selectors';
import { type Employee } from '~/store/api/employees/employees.types';
import { useAppSelector } from '~/store/store.hooks';

import { EmployeeCvControls } from './EmployeeCvControls';
import { EmployeeDescription } from './EmployeeDescription';

export const EmployeeCard = ({ employee }: { employee: Employee }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: currentEmployee } = useAppSelector(selectCurrentEmployee);

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
      {currentEmployee && isAdmin(currentEmployee) && (
        <EmployeeCvControls onCreate={onOpen} />
      )}
      <CreateCVModal
        isOpen={isOpen}
        onClose={onClose}
        employeeId={employee.id}
      />
    </Flex>
  );
};
