import { useState } from 'react';

import { Flex, Heading } from '@chakra-ui/react';
import {
  type FetchBaseQueryError,
  skipToken
} from '@reduxjs/toolkit/dist/query/react';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';
import { useParams } from 'react-router-dom';

import { SECTION_PADDING } from '~/features/employee/employee.styles';
import {
  type ChangedEmployeeEducationInfoValues,
  type EmployeeEducationInfoFormValues
} from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EducationInfo/EducationInfo.schema';
import { toastConfig } from '~/shared/shared.constants';
import { Button } from '~/shared/ui/components/Button';
import { ConfirmationModal as ConfirmDeleteModal } from '~/shared/ui/components/ConfirmationModal';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import {
  useCreateEducationMutation,
  useDeleteEducationMutation,
  useUpdateEducationMutation
} from '~/store/api/employees/education/education.api';
import { type EmployeeEducation } from '~/store/api/employees/employees.types';

import { EducationInfoControllers } from './EducationInfoControllers';
import { EducationInfoItem } from './EducationInfoItem';
import { EducationSection } from './EducationSection';
import { EducationInfoModal } from './modals/EducationInfo/EducationInfoModal';
import { InfoSection } from '../components/InfoSection';

export const EducationInfo = ({
  educations,
  canEdit
}: {
  educations: EmployeeEducation[];
  canEdit: boolean;
}) => {
  const [educationId, setEducationId] = useState<number>(0);
  const [isOpenEducationModal, setOpenEducationModal] =
    useState<boolean>(false);
  const [isOpenConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  const [t] = useTranslation();

  const { id } = useParams();

  const employeeId = id ? +id : Number(skipToken);

  const [createEducation, { isLoading: isLoadingCreate }] =
    useCreateEducationMutation();
  const [deleteEducation, { isLoading: isLoadingDelete }] =
    useDeleteEducationMutation();
  const [updateEducation, { isLoading: isLoadingChange }] =
    useUpdateEducationMutation();

  const getChoosedEducation = () =>
    educations.find((education) => education.id === educationId);

  const errorToast = useErrorToast({ ...toastConfig });

  const successToast = useSuccessToast({ ...toastConfig });

  const onCloseConfirmDeleteModal = () => {
    setEducationId(0);
    setOpenConfirmModal(false);
  };

  const onCloseEducationInfoTab = () => {
    setEducationId(0);
    setOpenEducationModal(false);
  };

  const addEducationInfo = async (values: EmployeeEducationInfoFormValues) => {
    const response = await createEducation({ ...values, employeeId });

    if ((response as { error?: FetchBaseQueryError }).error) {
      errorToast({
        description: t('domains:global.errors.descriptions.unknown_error')
      });
    } else {
      onCloseEducationInfoTab();
      successToast({
        description: t('domains:global.confirmations.descriptions.saved')
      });
    }
  };

  const deleteEducationInfo = async (id: number) => {
    const response = await deleteEducation({ employeeId, id });

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

  const changeEducationInfo = async (
    values: ChangedEmployeeEducationInfoValues
  ) => {
    const response = await updateEducation({
      education: values,
      employeeId,
      educationId
    });

    if ((response as { error?: FetchBaseQueryError }).error) {
      errorToast({
        description: t('domains:global.errors.descriptions.unknown_error')
      });
    } else {
      onCloseEducationInfoTab();
      successToast({
        description: t('domains:global.confirmations.descriptions.saved')
      });
    }
  };

  const onSubmitData = (
    values: EmployeeEducationInfoFormValues | ChangedEmployeeEducationInfoValues
  ) => {
    if (!educationId) {
      return addEducationInfo(values as EmployeeEducationInfoFormValues);
    }

    return changeEducationInfo(values as ChangedEmployeeEducationInfoValues);
  };

  return (
    <>
      <Heading
        variant="4"
        textTransform="uppercase"
        padding="40px 40px 0 40px"
      >
        {t('domains:employee.titles.profile_tabs.education.title')}
      </Heading>

      {educations.map((education) => (
        <EducationSection key={education.id}>
          <Flex
            justifyContent="space-between"
            padding={SECTION_PADDING}
          >
            <EducationInfoItem education={education} />

            {canEdit ? (
              <EducationInfoControllers
                onOpenInfoTab={() => {
                  setEducationId(education.id);
                  setOpenEducationModal(true);
                }}
                onOpenDeleteConfirm={() => {
                  setEducationId(education.id);
                  setOpenConfirmModal(true);
                }}
              />
            ) : null}
          </Flex>
        </EducationSection>
      ))}

      {canEdit && (
        <InfoSection style={{ gap: 0 }}>
          <Button
            variant="primaryOutline"
            outline="none"
            boxShadow="none"
            leftIcon={<MdAdd />}
            margin="auto"
            onClick={() => {
              setEducationId(0);
              setOpenEducationModal(true);
            }}
          >
            {t('domains:employee.actions.add_education')}
          </Button>

          <EducationInfoModal
            education={getChoosedEducation()}
            isOpen={isOpenEducationModal}
            onCloseEducationInfoTab={onCloseEducationInfoTab}
            onConfirm={onSubmitData}
            isLoading={isLoadingCreate || isLoadingChange}
          />
          <ConfirmDeleteModal
            title={t('domains:global.confirmations.titles.delete_education')}
            description={t(
              'domains:global.confirmations.descriptions.delete_education'
            )}
            onConfirm={() =>
              educationId ? deleteEducationInfo(educationId) : errorToast()
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
