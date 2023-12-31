import { useState } from 'react';

import { Flex, Heading, Text } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';
import { useParams } from 'react-router-dom';

import { SECTION_PADDING } from '~/features/employee/employee.styles';
import { toastConfig } from '~/shared/shared.constants';
import { Button } from '~/shared/ui/components/Button';
import { ConfirmationModal as ConfirmDeleteModal } from '~/shared/ui/components/ConfirmationModal';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { useDeleteEducationMutation } from '~/store/api/employees/education/education.api';
import {
  type Employee,
  type EmployeeEducation
} from '~/store/api/employees/employees.types';

import { EducationInfoControllers } from './EducationInfoControllers';
import { EducationInfoItem } from './EducationInfoItem';
import { EducationSection } from './EducationSection';
import { EducationInfoModal } from './modals/EducationInfo/EducationInfoModal';
import { InfoSection } from '../components/InfoSection';

export const EducationInfo = ({
  educations,
  canEdit,
  employee
}: {
  educations: EmployeeEducation[];
  canEdit: boolean;
  employee: Employee;
}) => {
  const [educationId, setEducationId] = useState<number>(0);
  const [isOpenEducationModal, setOpenEducationModal] =
    useState<boolean>(false);
  const [isOpenConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  const [t] = useTranslation();

  const { id } = useParams();

  const employeeId = id ? +id : Number(skipToken);
  const [deleteEducation, { isLoading: isLoadingDelete }] =
    useDeleteEducationMutation();

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
  const deleteEducationInfo = async (id: number) => {
    try {
      await deleteEducation({ employeeId, id }).unwrap();
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
        {t('domains:employee.titles.profile_tabs.education.title')}
      </Heading>

      {educations.length ? (
        educations.map((education) => (
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
            employee={employee}
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
