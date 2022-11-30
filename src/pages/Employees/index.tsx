import { useDisclosure } from '@chakra-ui/react';

import { CreateEmployeeModal } from '~/features/employee/CreateEmployeeModal';
import { EmployeesFiltersDrawer } from '~/features/employees/Filters';
import { createEmployeesFilterControl } from '~/features/employees/Filters/EmployeesFilterControl';
import { type AppliedEmployeesFilters } from '~/features/employees/Filters/employeesFilters.schema';
import { EmployeesTablesContainer } from '~/features/employees/Tables';
import { EmployeesPositionsTable } from '~/features/employees/Tables/PositionsTable';
import { AddEmployeeButton } from '~/pages/Employees/AddEmployeeButton';
import { PageContainer } from '~/shared/layout/Page/PageContainer';
import { PageToolbox } from '~/shared/layout/Page/PageToolbox';

export const Employees = () => {
  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose
  } = useDisclosure();

  const filterSubmit = (filters: AppliedEmployeesFilters) => {
    console.debug(filters);
  };

  return (
    <PageContainer>
      <EmployeesTablesContainer table={EmployeesPositionsTable} />
      {isCreateModalOpen && (
        <CreateEmployeeModal
          isOpen={isCreateModalOpen}
          onClose={onCreateModalClose}
        />
      )}
      <PageToolbox
        action={<AddEmployeeButton onClick={onCreateModalOpen} />}
        drawerControl={createEmployeesFilterControl}
        drawerContent={<EmployeesFiltersDrawer onSubmit={filterSubmit} />}
      />
    </PageContainer>
  );
};
