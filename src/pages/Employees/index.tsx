import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { EmployeesTable } from 'features/employees/Table';
import { EmployeesData } from 'features/employees/Table/fixture';
import { PageHeader } from 'shared/layout/PageHeader';

export const Employees = () => {
  const [t] = useTranslation();

  return (
    <>
      <PageHeader
        title={t('navigation:links.employees')}
        onAddButtonClick={() => ({})}
        onFilterButtonClick={() => ({})}
        isAdmin={false}
      />
      <Box margin="10px 110px 16px 110px">
        <EmployeesTable data={EmployeesData} />
      </Box>
    </>
  );
};
