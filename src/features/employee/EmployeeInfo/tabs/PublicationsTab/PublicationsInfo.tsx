import { useState } from 'react';

import { Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { SECTION_PADDING } from '~/features/employee/employee.styles';
import { InfoSection } from '~/features/employee/EmployeeInfo/tabs/components/InfoSection';
import { EducationInfoControllers } from '~/features/employee/EmployeeInfo/tabs/EducationTab/EducationInfoControllers';
import { EducationSection } from '~/features/employee/EmployeeInfo/tabs/EducationTab/EducationSection';
import { EditPublicationInfoModal } from '~/features/employee/EmployeeInfo/tabs/PublicationsTab/modals/EditPublicationInfoModal';
import { PublicationInfoItem } from '~/features/employee/EmployeeInfo/tabs/PublicationsTab/PublicationInfoItem';
import { toastConfig } from '~/shared/shared.constants';
import { Button } from '~/shared/ui/components/Button';
import { ConfirmationModal } from '~/shared/ui/components/ConfirmationModal';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import {
  type Employee,
  type EmployeePublication
} from '~/store/api/employees/employees.types';
import { useDeletePublicationMutation } from '~/store/api/publications/publications.api';

export const PublicationsInfo = ({
  employee,
  publications,
  canEdit
}: {
  employee: Employee;
  publications: EmployeePublication[];
  canEdit: boolean;
}) => {
  const [t] = useTranslation();

  const [isOpenPublicationModal, setOpenPublicationModal] =
    useState<boolean>(false);
  const [isOpenConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [publicationId, setPublicationId] = useState<number>(0);
  const [deletePublication, { isLoading: isLoadingDelete }] =
    useDeletePublicationMutation();
  const getChosenPublication = () =>
    publications.find((publication) => publication.id === publicationId);

  const errorToast = useErrorToast(toastConfig);
  const successToast = useSuccessToast(toastConfig);

  const onCloseConfirmDeleteModal = () => {
    setPublicationId(0);
    setOpenConfirmModal(false);
  };

  const onClosePublicationInfoTab = () => {
    setPublicationId(0);
    setOpenPublicationModal(false);
  };
  const deletePublicationInfo = async (publicationId: number) => {
    try {
      await deletePublication({
        employeeId: employee.id,
        publicationId
      }).unwrap();
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
        {t('domains:employee.titles.profile_tabs.publications.name')}
      </Heading>

      {publications.length ? (
        publications.map((publication) => (
          <EducationSection key={publication.id}>
            <Flex
              justifyContent="space-between"
              padding={SECTION_PADDING}
            >
              <PublicationInfoItem publication={publication} />
              {canEdit ? (
                <EducationInfoControllers
                  onOpenInfoTab={() => {
                    setPublicationId(publication.id);
                    setOpenPublicationModal(true);
                  }}
                  onOpenDeleteConfirm={() => {
                    setPublicationId(publication.id);
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
        <InfoSection gap={0}>
          <Button
            variant="primaryOutline"
            outline="none"
            boxShadow="none"
            leftIcon={<MdAdd />}
            margin="auto"
            onClick={() => {
              setPublicationId(0);
              setOpenPublicationModal(true);
            }}
          >
            {t('domains:employee.actions.add_publication')}
          </Button>

          <EditPublicationInfoModal
            publication={getChosenPublication()}
            isOpen={isOpenPublicationModal}
            onClose={onClosePublicationInfoTab}
            employee={employee}
          />
          <ConfirmationModal
            title={t('domains:global.confirmations.titles.delete_education')}
            description={t(
              'domains:global.confirmations.descriptions.delete_education'
            )}
            onConfirm={() =>
              publicationId
                ? deletePublicationInfo(publicationId)
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
