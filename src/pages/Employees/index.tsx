import { EmployeesFiltersDrawer } from '~/features/employees/Filters';
import { AddEmployeeButton } from '~/features/employees/Filters/AddEmployeeButton';
import { createEmployeesFilterControl } from '~/features/employees/Filters/EmployeesFilterControl';
import { EmployeesTableContainer } from '~/features/employees/Table';
import { PageContainer } from '~/shared/layout/Page/PageContainer';
import { PageToolbox } from '~/shared/layout/Page/PageToolbox';

export const Employees = () => (
  <PageContainer>
    <EmployeesTableContainer />
    <PageToolbox
      action={<AddEmployeeButton />}
      drawerControl={createEmployeesFilterControl}
      drawerContent={<EmployeesFiltersDrawer />}
    />
  </PageContainer>
);
