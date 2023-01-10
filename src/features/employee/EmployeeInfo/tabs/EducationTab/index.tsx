import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { isEditable } from '~/features/employee/employee.utils';
import { useGetCurrentUserQuery } from '~/store/api/authentication/authentication.api';
import { type Employee } from '~/store/api/employees/employees.types';

import { CertificatesInfo } from './CertificatesInfo';
import { EducationInfo } from './EducationInfo';

export const EducationTab = ({ employee }: { employee: Employee }) => {
  const { educations, certificates } = employee;
  const { data: currentUser } = useGetCurrentUserQuery();

  const [t] = useTranslation();
  const canEdit = isEditable(employee.id, currentUser);

  return (
    <Box>
      {educations ? (
        <EducationInfo
          educations={educations}
          canEdit={canEdit}
        />
      ) : (
        <div>{t('domains:employee.errors.no_data')}</div>
      )}
      {certificates ? (
        <CertificatesInfo
          certificates={certificates}
          canEdit={canEdit}
        />
      ) : (
        <div>{t('domains:employee.errors.no_data')}</div>
      )}
    </Box>
  );
};
