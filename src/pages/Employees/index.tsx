import { EmployeesFiltersDrawer } from '~/features/employees/Filters';
import { AddEmployeeButton } from '~/features/employees/Filters/AddEmployeeButton';
import { createEmployeesFilterControl } from '~/features/employees/Filters/EmployeesFilterControl';
import { EmployeesTablesContainer } from '~/features/employees/Tables';
import { EmployeesPositionsTable } from '~/features/employees/Tables/PositionsTable';
import { PageContainer } from '~/shared/layout/Page/PageContainer';
import { PageToolbox } from '~/shared/layout/Page/PageToolbox';

export const Employees = () => (
  <PageContainer>
    <EmployeesTablesContainer table={EmployeesPositionsTable} />
    <PageToolbox
      action={<AddEmployeeButton />}
      drawerControl={createEmployeesFilterControl}
      drawerContent={<EmployeesFiltersDrawer />}
    />
  </PageContainer>
);
