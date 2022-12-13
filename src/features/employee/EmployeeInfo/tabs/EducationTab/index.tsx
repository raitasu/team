import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { type Employee } from '~/store/api/employees/employees.types';

import { CertificatesInfo } from './CertificatesInfo';
import { EducationInfo } from './EducationInfo';

export const EducationTab = ({ employee }: { employee: Employee }) => {
  const { educations, certificates } = employee;

  const [t] = useTranslation();

  return (
    <Box>
      {educations ? (
        <EducationInfo educations={educations} />
      ) : (
        <div>{t('domains:employee.errors.no_data')}</div>
      )}
      {certificates ? (
        <CertificatesInfo certificates={certificates} />
      ) : (
        <div>{t('domains:employee.errors.no_data')}</div>
      )}
    </Box>
  );
};
