import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { EmployeesTableContainer } from '~/features/employees/Table';
import { PageHeader } from '~/shared/layout/PageHeader';

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
        <EmployeesTableContainer />
      </Box>
    </>
  );
};
