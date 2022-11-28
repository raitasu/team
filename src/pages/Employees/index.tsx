import { useDisclosure } from '@chakra-ui/react';

import { CreateEmployeeModal } from '~/features/employee/CreateEmployeeModal';
import { EmployeesFiltersDrawer } from '~/features/employees/Filters';
import { createEmployeesFilterControl } from '~/features/employees/Filters/EmployeesFilterControl';
import { EmployeesTablesContainer } from '~/features/employees/Tables';
import { EmployeesPositionsTable } from '~/features/employees/Tables/PositionsTable';
import { AddEmployeeButton } from '~/pages/Employees/AddEmployeeButton';
import { PageContainer } from '~/shared/layout/Page/PageContainer';
import { PageToolbox } from '~/shared/layout/Page/PageToolbox';

export const Employees = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <PageContainer>
      <EmployeesTablesContainer table={EmployeesPositionsTable} />
      {isOpen && (
        <CreateEmployeeModal
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
      <PageToolbox
        action={<AddEmployeeButton onClick={onOpen} />}
        drawerControl={createEmployeesFilterControl}
        drawerContent={<EmployeesFiltersDrawer />}
      />
    </PageContainer>
  );
};
