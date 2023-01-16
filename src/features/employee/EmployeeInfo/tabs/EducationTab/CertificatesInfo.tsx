import { Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { Button } from '~/shared/ui/components/Button';
import { type EmployeeCertificate } from '~/store/api/employees/employees.types';

import { CertificatesInfoItem } from './CertificatesInfoItem';
import { EducationSection } from './EducationSection';
import { InfoSection } from '../components/InfoSection';

export const CertificatesInfo = ({
  certificates
}: {
  certificates: EmployeeCertificate[];
}) => {
  const [t] = useTranslation();

  return (
    <>
      <Heading
        variant="4"
        textTransform="uppercase"
        padding="40px 40px 0 40px"
      >
        {t('domains:employee.titles.profile_tabs.education.certificates')}
      </Heading>
      <EducationSection>
        {certificates.map((certificate) => (
          <CertificatesInfoItem
            key={certificate.id}
            certificate={certificate}
          />
        ))}
      </EducationSection>
      <InfoSection>
        <Button
          variant="primaryOutline"
          outline="none"
          boxShadow="none"
          leftIcon={<MdAdd />}
          margin="auto"
        >
          {t('domains:employee.actions.add_certificate')}
        </Button>
      </InfoSection>
    </>
  );
};
