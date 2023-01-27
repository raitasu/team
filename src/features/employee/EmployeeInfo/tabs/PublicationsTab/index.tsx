import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { isEditable } from '~/features/employee/employee.utils';
import { useGetCurrentUserQuery } from '~/store/api/authentication/authentication.api';
import { type Employee } from '~/store/api/employees/employees.types';

import { PublicationsInfo } from './PublicationsInfo';

export const PublicationsTab = ({ employee }: { employee: Employee }) => {
  const { publications } = employee;
  const { data: currentUser } = useGetCurrentUserQuery();
  const canEdit = isEditable(employee.id, currentUser);

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
