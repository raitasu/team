import { useState } from 'react';

import { Flex, Heading, Text } from '@chakra-ui/react';
import {
  type FetchBaseQueryError,
  skipToken
} from '@reduxjs/toolkit/dist/query/react';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';
import { useParams } from 'react-router-dom';

import { SECTION_PADDING } from '~/features/employee/employee.styles';
import { InfoSection } from '~/features/employee/EmployeeInfo/tabs/components/InfoSection';
import { EducationInfoControllers } from '~/features/employee/EmployeeInfo/tabs/EducationTab/EducationInfoControllers';
import { EducationSection } from '~/features/employee/EmployeeInfo/tabs/EducationTab/EducationSection';
import {
  type ChangedEmployeePublicationInfoValues,
  type EmployeePublicationInfoFormValues
} from '~/features/employee/EmployeeInfo/tabs/PublicationsTab/EditPublication.schema';
import { EditPublicationInfoModal } from '~/features/employee/EmployeeInfo/tabs/PublicationsTab/modals/EditPublicationInfoModal';
import { PublicationInfoItem } from '~/features/employee/EmployeeInfo/tabs/PublicationsTab/PublicationInfoItem';
import { toastConfig } from '~/shared/shared.constants';
import { Button } from '~/shared/ui/components/Button';
import { ConfirmationModal } from '~/shared/ui/components/ConfirmationModal';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { type EmployeePublication } from '~/store/api/employees/employees.types';
import {
  useCreatePublicationMutation,
  useDeletePublicationMutation,
  useUpdatePublicationsMutation
} from '~/store/api/publications/publications.api';

export const PublicationsInfo = ({
  publications,
  canEdit
}: {
  publications: EmployeePublication[];
  canEdit: boolean;
}) => {
  const [t] = useTranslation();
  const { id } = useParams();
  const employeeId = id ? +id : Number(skipToken);

  const [isOpenPublicationModal, setOpenPublicationModal] =
    useState<boolean>(false);
  const [isOpenConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [publicationId, setPublicationId] = useState<number>(0);
  const [createPublication, { isLoading: isLoadingCreate }] =
    useCreatePublicationMutation();
  const [updatePublications, { isLoading: isLoadingUpdate }] =
    useUpdatePublicationsMutation();
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

  const createPublicationInfo = async (
    values: EmployeePublicationInfoFormValues
  ) => {
    const response = await createPublication({ data: values, employeeId });

    if ((response as { error?: FetchBaseQueryError }).error) {
      errorToast({
        description: t('domains:global.errors.descriptions.unknown_error')
      });
    } else {
      onClosePublicationInfoTab();
      successToast({
        description: t('domains:global.confirmations.descriptions.saved')
      });
    }
  };
  const deletePublicationInfo = async (publicationId: number) => {
    const response = await deletePublication({ employeeId, publicationId });

    if ((response as { error?: FetchBaseQueryError }).error) {
      errorToast({
        description: t('domains:global.errors.descriptions.unknown_error')
      });
    } else {
      onCloseConfirmDeleteModal();
      successToast({
        description: t('domains:global.confirmations.descriptions.deleted')
      });
    }
  };

  const updatePublicationInfo = async (
    values: ChangedEmployeePublicationInfoValues
  ) => {
    try {
      await updatePublications({
        data: values,
        employeeId,
        publicationId
      }).unwrap();
      onClosePublicationInfoTab();
      successToast({
        description: t('domains:global.confirmations.descriptions.saved')
      });
    } catch (e) {
      console.error(e);
      errorToast({
        description: t('domains:global.errors.descriptions.unknown_error')
      });
    }
  };

  const onSubmitData = (
    values:
      | EmployeePublicationInfoFormValues
      | ChangedEmployeePublicationInfoValues
  ) => {
    if (!publicationId) {
      return createPublicationInfo(values as EmployeePublicationInfoFormValues);
    }

    return updatePublicationInfo(
      values as ChangedEmployeePublicationInfoValues
    );
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
            onConfirm={onSubmitData}
            isOpen={isOpenPublicationModal}
            onClose={onClosePublicationInfoTab}
            isLoading={isLoadingCreate || isLoadingUpdate}
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
