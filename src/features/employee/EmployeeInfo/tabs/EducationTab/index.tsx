import { Box } from '@chakra-ui/react';

import { type Employee } from '~/store/api/employees/employees.types';

import { CertificatesInfo } from './CertificatesInfo';
import { EducationInfo } from './EducationInfo';

export const EducationTab = ({ employee }: { employee: Employee }) => (
  <Box>
    <EducationInfo educations={employee.educations.slice(0, 3)} />
    <CertificatesInfo certificates={employee.certificates.slice(0, 1)} />
  </Box>
);
