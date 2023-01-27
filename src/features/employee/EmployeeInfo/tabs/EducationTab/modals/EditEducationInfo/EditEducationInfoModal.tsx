import { Flex, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import upperCase from 'lodash/upperCase';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  type ChangedEmployeeEducationInfoValues,
  type EmployeeEducationInfoFormValues,
  EmployeeEducationInfoSchema
} from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/EditEducationInfo.schema';
import { getInitialState } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/EditEducationInfo.utils';
import { CountryField } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/Fields/CountryField';
import { DateField } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/Fields/DateFIeld';
import { DegreeField } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/Fields/DegreeField';
import { StudyField } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/Fields/StudyField';
import { UniversityNameField } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/Fields/UniversityNameField';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { ConfirmationModal } from '~/shared/ui/components/ConfirmationModal';
import { type EmployeeEducation } from '~/store/api/employees/employees.types';

import { EducationInfoControllers } from '../../EducationInfoControllers';

export const EditEducationInfoModal = ({
  education,
  onConfirm,
  canEdit
}: {
  education: EmployeeEducation;
  onConfirm: (values: ChangedEmployeeEducationInfoValues) => void;
  canEdit: boolean;
}) => {
  const [t] = useTranslation();

  const {
    isOpen: isOpenEducationInfoTab,
    onOpen: onOpenEducationInfoTab,
    onClose: onCloseEducationInfoTab
  } = useDisclosure();

  const {
    isOpen: isOpenConfirmModal,
    onOpen: onOpenConfirmModal,
    onClose: onCloseConfirmModal
  } = useDisclosure();

  const deleteEducationSection = (value: number) => {
    console.debug(`Delete education tab number ${value}`);
    onCloseConfirmModal();
  };

  const methods = useForm<EmployeeEducationInfoFormValues>({
    defaultValues: getInitialState(education),
    mode: 'onBlur',
    resolver: zodResolver(EmployeeEducationInfoSchema)
  });
  const closeEducationInfoForm = () => {
    methods.reset();
    onCloseEducationInfoTab();
  };

  return (
    <>
      {canEdit ? (
        <EducationInfoControllers
          onOpenInfoTab={onOpenEducationInfoTab}
          onOpenDeleteConfirm={onOpenConfirmModal}
        />
      ) : null}
      <BaseModal
        autoFocus={false}
        title={upperCase(
          t(
            'domains:employee.titles.profile_tabs.personal_information.education.section_title'
          )
        )}
        isOpen={isOpenEducationInfoTab}
        onClose={closeEducationInfoForm}
        shouldUseOverlay
        isCentered
        contentProps={{
          maxWidth: '688px'
        }}
        footer={
          <ActionsModalFooter
            onCancel={closeEducationInfoForm}
            onReset={() => methods.reset()}
            onSubmit={methods.handleSubmit((data) => {
              const changedValues = Object.entries(data).filter(
                (_, i) =>
                  Object.entries(data)[i][1] !==
                  Object.entries(getInitialState(education))[i][1]
              );

              onConfirm(Object.fromEntries(changedValues));
            })}
            isValid={methods.formState.isValid}
            isTouched={methods.formState.isDirty}
          />
        }
      >
        <Flex
          flexDirection="column"
          gap="20px"
        >
          <FormProvider {...methods}>
            <UniversityNameField />
            <DegreeField />
            <StudyField />
            <CountryField />
            <DateField />
          </FormProvider>
        </Flex>
      </BaseModal>
      <ConfirmationModal
        title={t('domains:global.confirmations.titles.delete_education')}
        description={t(
          'domains:global.confirmations.descriptions.delete_education'
        )}
        onConfirm={() => deleteEducationSection(education.id)}
        isOpen={isOpenConfirmModal}
        onClose={onCloseConfirmModal}
      />
    </>
  );
};
