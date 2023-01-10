import { Flex } from '@chakra-ui/react';
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
import { type EmployeeEducation } from '~/store/api/employees/employees.types';

export const EditEducationInfoModal = ({
  education,
  onConfirm,
  isOpenModal,
  onCloseModal
}: {
  education: EmployeeEducation;
  isOpenModal: boolean;
  onCloseModal: () => void;
  onConfirm: (values: ChangedEmployeeEducationInfoValues) => void;
}) => {
  const [t] = useTranslation();

  const methods = useForm<EmployeeEducationInfoFormValues>({
    defaultValues: getInitialState(education),
    mode: 'onBlur',
    resolver: zodResolver(EmployeeEducationInfoSchema)
  });
  const closeEducationInfoForm = () => {
    methods.reset();
    onCloseModal();
  };

  return (
    <BaseModal
      autoFocus={false}
      title={upperCase(
        t(
          'domains:employee.titles.profile_tabs.personal_information.education.section_title'
        )
      )}
      isOpen={isOpenModal}
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
  );
};
