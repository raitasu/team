import { useEffect } from 'react';

import { Flex, Grid, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { getMonth, getYear } from 'date-fns';
import isEqual from 'lodash/isEqual';
import upperCase from 'lodash/upperCase';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EmployeeStatus } from '~/features/employee/CreateEmployeeModal/EmployeeDetails/EmployeeStatus';
import { COLUMN_GAP } from '~/features/employee/employee.styles';
import {
  type ChangedEmployeeGeneralInfoValues,
  type EmployeeGeneralInfoFormValues,
  EmployeeGeneralInfoSchema
} from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/editGeneralInfo.schemas';
import {
  getInitialFilterState,
  getInitialState
} from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/editGeneralInfo.utils';
import { AboutField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/Fields/AboutField';
import { AvatarField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/Fields/AvatarField';
import { ClothingSizeField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/Fields/ClothingSizeField';
import { BirthDateField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/Fields/DateOfBirthField';
import { GenderField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/Fields/GenderField';
import { InterestsField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/Fields/InterestField';
import { NameField } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/Fields/NameField';
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

  const { reset } = methods;
  const closeGeneralInfoForm = () => {
    methods.reset();
    onCloseGeneralInfoTab();
  };

  useEffect(() => {
    reset(getInitialState(employee), { keepDefaultValues: false });
  }, [reset, employee]);

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
            const { startMonth, startYear, ...rest } = data;
            const startCareerAt =
              startYear && !!String(startMonth)
                ? new Date(startYear, Number(startMonth)).toISOString()
                : new Date(
                    startYear || getYear(new Date()),
                    startMonth || getMonth(new Date())
                  ).toISOString();
            const object = {
              ...rest,
              start_career_at: startCareerAt
            };

            const a = Object.entries(object);
            const b = Object.entries(
              getInitialFilterState(getInitialState(employee))
            );

            const changedValues = a.filter(
              (_, i) => !isEqual(a[i][1], b[i][1])
            );

            onConfirm(Object.fromEntries(changedValues));
          })}
          isValid={methods.formState.isValid}
          isTouched={methods.formState.isDirty}
        />
      }
    >
      <Grid
        flexDirection="column"
        gap="20px"
      >
        <FormProvider {...methods}>
          <Flex justifyContent="space-between">
            <AvatarField
              avatarUrl={employee.avatar || null}
              onReset={() => methods.resetField('avatar')}
            />
            <Stack
              width="366px"
              spacing="20px"
            >
              <NameField />
              <EmployeeStatus />
            </Stack>
          </Flex>
          <GenderField />
          <StartCareerField />
          <BirthDateField />
          <AboutField />
          <InterestsField />
          <Grid
            gridTemplateColumns="1fr 1fr"
            gap={COLUMN_GAP}
          >
            <ClothingSizeField name="sweat_shirt_size" />
            <ClothingSizeField name="t_shirt_size" />
          </Grid>
        </FormProvider>
      </Grid>
    </BaseModal>
  );
};
