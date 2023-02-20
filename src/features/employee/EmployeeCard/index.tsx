import { Flex, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { isAdmin } from '~/features/employee/employee.utils';
import { PagePaths } from '~/router/router.constants';
import { Avatar } from '~/shared/ui/components/Avatar';
import { ConfirmationModal } from '~/shared/ui/components/ConfirmationModal';
import { type Employee } from '~/store/api/employees/employees.types';

import { EmployeeCvControls } from './EmployeeCvControls';
import { EmployeeDescription } from './EmployeeDescription';

export const EmployeeCard = ({ employee }: { employee: Employee }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [t] = useTranslation();

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
      <ConfirmationModal
        title={t('domains:employee.actions.create_cv')}
        description={t('domains:employee.actions.create_cv_confirmation')}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() =>
          navigate(`${PagePaths.Employees}/${employee.id}/add-cv`)
        }
      />
    </Flex>
  );
};
