import { useEffect } from 'react';

import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  type ChangedEmployeeEducationInfoValues,
  type EmployeeEducationInfoFormValues,
  EmployeeEducationInfoSchema
} from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EducationInfo/EducationInfo.schema';
import {
  getInitialState,
  initialEducationValues
} from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EducationInfo/EducationInfo.utils';
import { CountryField } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EducationInfo/Fields/CountryField';
import { DateField } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EducationInfo/Fields/DateField';
import { DegreeField } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EducationInfo/Fields/DegreeField';
import { StudyField } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EducationInfo/Fields/StudyField';
import { UniversityNameField } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EducationInfo/Fields/UniversityNameField';
import { toastConfig } from '~/shared/shared.constants';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import {
  useCreateEducationMutation,
  useUpdateEducationMutation
} from '~/store/api/employees/education/education.api';
import {
  type Employee,
  type EmployeeEducation
} from '~/store/api/employees/employees.types';

export const EducationInfoModal = ({
  education,
  isOpen,
  onCloseEducationInfoTab,
  employee
}: {
  education: EmployeeEducation | undefined;
  isOpen: boolean;
  onCloseEducationInfoTab: () => void;
  employee: Employee;
}) => {
  const [t] = useTranslation();
  const [createEducation, { isLoading: isLoadingCreate }] =
    useCreateEducationMutation();
  const [updateEducation, { isLoading: isLoadingChange }] =
    useUpdateEducationMutation();
  const errorToast = useErrorToast({ ...toastConfig });
  const successToast = useSuccessToast({ ...toastConfig });
  const methods = useForm<EmployeeEducationInfoFormValues>({
    defaultValues: education
      ? getInitialState(education)
      : initialEducationValues(),
    mode: 'onBlur',
    resolver: zodResolver(EmployeeEducationInfoSchema)
  });

  const { reset } = methods;

  const addEducationInfo = async (values: EmployeeEducationInfoFormValues) => {
    try {
      await createEducation({ ...values, employeeId: employee.id }).unwrap();
      onCloseEducationInfoTab();
      successToast({
        description: t('domains:global.confirmations.descriptions.saved')
      });
      reset(initialEducationValues(), {
        keepDefaultValues: false
      });
    } catch (e) {
      console.error(e);
      errorToast({
        description: t('domains:global.errors.descriptions.unknown_error')
      });
    }
  };

  const changeEducationInfo = async (
    values: ChangedEmployeeEducationInfoValues
  ) => {
    if (!education) {
      return;
    }

    try {
      await updateEducation({
        education: values,
        employeeId: employee.id,
        educationId: education.id
      }).unwrap();
      onCloseEducationInfoTab();
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

  const onSubmitData = async (
    values: EmployeeEducationInfoFormValues | ChangedEmployeeEducationInfoValues
  ) => {
    if (!education) {
      await addEducationInfo(values as EmployeeEducationInfoFormValues);
    }

    await changeEducationInfo(values as ChangedEmployeeEducationInfoValues);
  };

  useEffect(
    () =>
      reset(education ? getInitialState(education) : initialEducationValues(), {
        keepDefaultValues: false
      }),
    [reset, education]
  );

  return (
    <BaseModal
      autoFocus={false}
      title={t(
        'domains:employee.titles.profile_tabs.personal_information.education.section_title'
      ).toUpperCase()}
      isOpen={isOpen}
      onClose={onCloseEducationInfoTab}
      shouldUseOverlay
      isCentered
      contentProps={{
        maxWidth: '688px'
      }}
      footer={
        <ActionsModalFooter
          onCancel={onCloseEducationInfoTab}
          onReset={() => methods.reset()}
          onSubmit={methods.handleSubmit((data) => {
            const { startDate, endDate, ...payload } = data;

            const validDate = {
              started_at:
                startDate.startMonth !== null && startDate.startYear
                  ? new Date(
                      +startDate.startYear,
                      +startDate.startMonth
                    ).toISOString()
                  : new Date().toString(),
              graduated_at:
                endDate.endMonth !== null && endDate.endYear
                  ? new Date(+endDate.endYear, +endDate.endMonth).toISOString()
                  : null
            };

            if (!education) {
              return onSubmitData({
                ...payload,
                ...validDate
              });
            }

            const changedValues = Object.entries(payload).filter(
              (_, i) =>
                Object.entries(data)[i][1] !==
                Object.entries(getInitialState(education))[i][1]
            );

            const updateCertificate = Object.fromEntries(changedValues);

            return onSubmitData({
              ...updateCertificate,
              ...validDate
            });
          })}
          isValid={methods.formState.isValid}
          isTouched={methods.formState.isDirty}
          isLoading={isLoadingChange || isLoadingCreate}
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
