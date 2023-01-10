import { Flex, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { SECTION_PADDING } from '~/features/employee/employee.styles';
import { Button } from '~/shared/ui/components/Button';
import { type EmployeeCertificate } from '~/store/api/employees/employees.types';

import { CertificatesInfoItem } from './CertificatesInfoItem';
import { EducationInfoControllers } from './EducationInfoControllers';
import { EducationSection } from './EducationSection';
import { InfoSection } from '../components/InfoSection';

export const CertificatesInfo = ({
  certificates,
  canEdit
}: {
  certificates: EmployeeCertificate[];
  canEdit: boolean;
}) => {
  const [t] = useTranslation();

  const onOpenCertificateInfoTab = () => {
    console.debug(
      'Open a modal window for changing information about this certificate'
    );
  };

  const onOpenConfirmModal = () => {
    console.debug('Open a confirm modal window for deleting this certificate');
  };

  return (
    <>
      <Heading
        variant="4"
        textTransform="uppercase"
        padding="40px 40px 0 40px"
      >
        {t('domains:employee.titles.profile_tabs.education.certificates')}
      </Heading>

      {certificates.map((certificate) => (
        <EducationSection key={certificate.id}>
          <Flex
            justifyContent="space-between"
            padding={SECTION_PADDING}
          >
            <CertificatesInfoItem certificate={certificate} />

            {canEdit ? (
              <EducationInfoControllers
                onOpenInfoTab={onOpenCertificateInfoTab}
                onOpenDeleteConfirm={onOpenConfirmModal}
              />
            ) : null}
          </Flex>
        </EducationSection>
      ))}
      <InfoSection style={{ gap: 0 }}>
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
