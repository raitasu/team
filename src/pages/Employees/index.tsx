import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { EmployeesTableContainer } from '~/features/employees/Table';
import { PageContainer } from '~/shared/layout/components/PageContainer';
import { PageTitle } from '~/shared/layout/components/PageTitle';
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
        onFilterBtnClick={() => ({})}
      />
      <EmployeesTableContainer />
    </PageContainer>
  );
};
