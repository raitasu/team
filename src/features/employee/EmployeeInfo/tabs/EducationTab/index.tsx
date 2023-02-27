import { Box, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { type EmployeeInfoTab } from '~/features/employee/EmployeeInfo/employeeInfo.types';

import { CertificatesInfo } from './CertificatesInfo';
import { EducationInfo } from './EducationInfo';

export const EducationTab: EmployeeInfoTab = ({ employee, canEdit }) => {
  const { educations, certificates } = employee;
  const [t] = useTranslation();

  return (
    <Box>
      {educations ? (
        <EducationInfo
          educations={educations}
          canEdit={canEdit}
        />
      ) : (
        <div>
          <Text color="brand.lightGray">
            {t('domains:employee.errors.no_data')}
          </Text>
        </div>
      )}
      {certificates ? (
        <CertificatesInfo
          certificates={certificates}
          canEdit={canEdit}
        />
      ) : (
        <div>
          <Text color="brand.lightGray">
            {t('domains:employee.errors.no_data')}
          </Text>
        </div>
      )}
    </Box>
  );
};
