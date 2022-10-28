import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { EmployeesFiltersDrawer } from '~/features/employees/Filters';
import { createEmployeesFilterControl } from '~/features/employees/Filters/EmployeesFilterControl';
import { EmployeesTableContainer } from '~/features/employees/Table';
import { PageContainer } from '~/shared/layout/Page/PageContainer';
import { PageTitle } from '~/shared/layout/Page/PageTitle';
import { Button } from '~/shared/ui/components/Button';

export const Employees = () => {
  const [t] = useTranslation();

  return (
    <PageContainer>
      <PageTitle
        title={t('navigation:links.employees')}
        action={
          <Button
            variant="primaryOutline"
            leftIcon={<MdAdd />}
          >
            {t('actions:employees.add_employee')}
          </Button>
        }
        drawerControl={createEmployeesFilterControl}
        drawerContent={<EmployeesFiltersDrawer />}
      />
      <EmployeesTableContainer />
    </PageContainer>
  );
};
