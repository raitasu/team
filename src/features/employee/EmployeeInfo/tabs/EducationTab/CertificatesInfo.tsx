import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { Button } from '~/shared/ui/components/Button';
import { type EmployeeCertificate } from '~/store/api/employees/employees.types';

import { InfoSection } from '../components/InfoSection';
import { CertificatesInfoItem } from './CertificatesInfoItem';
import { EducationSection } from './EducationSection';

export const CertificatesInfo = ({
  certificates
}: {
  certificates: EmployeeCertificate[];
}) => {
  const [t] = useTranslation();

  return (
    <>
      <EducationSection
        title={t('titles:employee.tabs.education.certificates')}
      >
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
          {t('actions:employee.add_certificate')}
        </Button>
      </InfoSection>
    </>
  );
};
