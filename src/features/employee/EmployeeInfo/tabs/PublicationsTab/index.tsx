import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { type EmployeeInfoTab } from '~/features/employee/EmployeeInfo/employeeInfo.types';

import { PublicationsInfo } from './PublicationsInfo';

export const PublicationsTab: EmployeeInfoTab = ({ employee, canEdit }) => {
  const { publications } = employee;
  const [t] = useTranslation();

  return (
    <Box>
      {publications ? (
        <PublicationsInfo
          publications={publications}
          canEdit={canEdit}
        />
      ) : (
        <div>{t('domains:employee.errors.no_data')}</div>
      )}
    </Box>
  );
};
