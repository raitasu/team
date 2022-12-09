import { useEffect } from 'react';

import { useDisclosure } from '@chakra-ui/react';

import { CreateEmployeeModal } from '~/features/employee/CreateEmployeeModal';
import { EmployeesFiltersDrawer } from '~/features/employees/Filters';
import { EmployeesFilterControl } from '~/features/employees/Filters/EmployeesFilterControl';
import { EmployeesTablesContainer } from '~/features/employees/Tables';
import { EmployeesPositionsTable } from '~/features/employees/Tables/PositionsTable';
import { AddEmployeeButton } from '~/pages/Employees/AddEmployeeButton';
import { PageContainer } from '~/shared/layout/Page/PageContainer';
import { PageToolbox } from '~/shared/layout/Page/PageToolbox';
import { resetEmployeesSlice } from '~/store/slices/employees/employees.slice';
import { useAppDispatch } from '~/store/store.hooks';

export const Employees = () => {
  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose
  } = useDisclosure();
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(resetEmployeesSlice());
    },
    [dispatch]
  );

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
        drawerControl={<EmployeesFilterControl />}
        drawerContent={<EmployeesFiltersDrawer />}
      />
    </PageContainer>
  );
};
