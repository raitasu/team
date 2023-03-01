import { useState } from 'react';

import { Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { SECTION_PADDING } from '~/features/employee/employee.styles';
import { toastConfig } from '~/shared/shared.constants';
import { Button } from '~/shared/ui/components/Button';
import { ConfirmationModal as ConfirmDeleteModal } from '~/shared/ui/components/ConfirmationModal';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { useDeleteCertificateMutation } from '~/store/api/employees/certificate/certificate.api';
import {
  type Employee,
  type EmployeeCertificate
} from '~/store/api/employees/employees.types';

import { CertificatesInfoItem } from './CertificatesInfoItem';
import { EducationInfoControllers } from './EducationInfoControllers';
import { EducationSection } from './EducationSection';
import { EditCertificateInfoModal } from './modals/EditCertificatesModal/EditCertificateInfoModal';
import { InfoSection } from '../components/InfoSection';

export const CertificatesInfo = ({
  certificates,
  canEdit,
  employee
}: {
  certificates: EmployeeCertificate[];
  canEdit: boolean;
  employee: Employee;
}) => {
  const [certificateId, setCertificateId] = useState<number>(0);
  const [isOpenCertificateModal, setOpenCertificateModal] =
    useState<boolean>(false);
  const [isOpenConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  const [t] = useTranslation();
  const [deleteCertificate, { isLoading: isLoadingDelete }] =
    useDeleteCertificateMutation();

  const getChosenCertificate = () =>
    certificates.find((certificate) => certificate.id === certificateId);

  const errorToast = useErrorToast(toastConfig);
  const successToast = useSuccessToast(toastConfig);

  const onCloseConfirmDeleteModal = () => {
    setCertificateId(0);
    setOpenConfirmModal(false);
  };

  const onCloseCertificateInfoTab = () => {
    setCertificateId(0);
    setOpenCertificateModal(false);
  };

  const deleteCertificateInfo = async (id: number) => {
    try {
      await deleteCertificate({ employeeId: employee.id, id }).unwrap();
      onCloseConfirmDeleteModal();
      successToast({
        description: t('domains:global.confirmations.descriptions.deleted')
      });
    } catch (e) {
      console.error(e);
      errorToast({
        description: t('domains:global.errors.descriptions.unknown_error')
      });
    }
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

      {certificates.length ? (
        certificates.map((certificate) => (
          <EducationSection key={certificate.id}>
            <Flex
              justifyContent="space-between"
              padding={SECTION_PADDING}
            >
              <CertificatesInfoItem certificate={certificate} />

              {canEdit ? (
                <EducationInfoControllers
                  onOpenInfoTab={() => {
                    setCertificateId(certificate.id);
                    setOpenCertificateModal(true);
                  }}
                  onOpenDeleteConfirm={() => {
                    setCertificateId(certificate.id);
                    setOpenConfirmModal(true);
                  }}
                />
              ) : null}
            </Flex>
          </EducationSection>
        ))
      ) : (
        <InfoSection style={{ gap: 0 }}>
          <Text color="brand.lightGray">
            {t('domains:employee.errors.no_data')}
          </Text>
        </InfoSection>
      )}

      {canEdit && (
        <InfoSection style={{ gap: 0 }}>
          <Button
            variant="primaryOutline"
            outline="none"
            boxShadow="none"
            leftIcon={<MdAdd />}
            margin="auto"
            onClick={() => {
              setCertificateId(0);
              setOpenCertificateModal(true);
            }}
          >
            {t('domains:employee.actions.add_certificate')}
          </Button>

          <EditCertificateInfoModal
            certificate={getChosenCertificate()}
            isOpen={isOpenCertificateModal}
            onClose={onCloseCertificateInfoTab}
            employee={employee}
          />
          <ConfirmDeleteModal
            title={t('domains:global.confirmations.titles.delete_education')}
            description={t(
              'domains:global.confirmations.descriptions.delete_education'
            )}
            onConfirm={() =>
              certificateId
                ? deleteCertificateInfo(certificateId)
                : errorToast()
            }
            isOpen={isOpenConfirmModal}
            onClose={() => onCloseConfirmDeleteModal()}
            isLoading={isLoadingDelete}
          />
        </InfoSection>
      )}
    </>
  );
};
