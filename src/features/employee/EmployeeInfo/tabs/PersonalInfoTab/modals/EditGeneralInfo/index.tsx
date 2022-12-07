import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import upperCase from 'lodash/upperCase';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  type ChangedEmployeeGeneralInfoValues,
  type EmployeeGeneralInfoFormValues,
  EmployeeGeneralInfoSchema
} from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/editGeneralInfo.schemas';
import { getInitialState } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/editGeneralInfo.utils';
import { AboutField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/Fields/AboutField';
import { ClothingSizeField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/Fields/ClothingSizeField';
import { BirthDateField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/Fields/DateOfBirthField';
import { GenderField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/Fields/GenderField';
import { InterestsField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/Fields/InterestField';
import { StartCareerField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/Fields/StartCareerField';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { type Employee } from '~/store/api/employees/employees.types';

export const EditGeneralInfoModal = ({
  employee,
  isOpenGeneralInfoTab,
  onCloseGeneralInfoTab,
  onConfirm
}: {
  employee: Employee;
  isOpenGeneralInfoTab: boolean;
  onCloseGeneralInfoTab: () => void;
  onConfirm: (values: ChangedEmployeeGeneralInfoValues) => void;
}) => {
  const [t] = useTranslation();
  const methods = useForm<EmployeeGeneralInfoFormValues>({
    defaultValues: getInitialState(employee),
    mode: 'onBlur',
    resolver: zodResolver(EmployeeGeneralInfoSchema)
  });
  const closeGeneralInfoForm = () => {
    methods.reset();
    onCloseGeneralInfoTab();
  };

  return (
    <BaseModal
      autoFocus={false}
      title={upperCase(
        t(
          'domains:employee.titles.profile_tabs.personal_information.general.section_title'
        )
      )}
      isOpen={isOpenGeneralInfoTab}
      onClose={closeGeneralInfoForm}
      shouldUseOverlay
      isCentered
      contentProps={{
        maxWidth: '688px'
      }}
      footer={
        <ActionsModalFooter
          onCancel={closeGeneralInfoForm}
          onReset={() => methods.reset()}
          onSubmit={methods.handleSubmit((data) => {
            const changedValues = Object.entries(data).filter(
              (_, i) =>
                Object.entries(data)[i][1] !==
                Object.entries(getInitialState(employee))[i][1]
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
          <GenderField />
          <StartCareerField />
          <BirthDateField />
          <AboutField />
          <InterestsField />
          <ClothingSizeField />
        </FormProvider>
      </Flex>
    </BaseModal>
  );
};
