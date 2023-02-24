import { useEffect, useMemo } from 'react';

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
  getChangedDate,
  getInitialState,
  initialEducationValues
} from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EducationInfo/EducationInfo.utils';
import { CountryField } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EducationInfo/Fields/CountryField';
import { DateField } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EducationInfo/Fields/DateField';
import { DegreeField } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EducationInfo/Fields/DegreeField';
import { StudyField } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EducationInfo/Fields/StudyField';
import { UniversityNameField } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EducationInfo/Fields/UniversityNameField';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { type EmployeeEducation } from '~/store/api/employees/employees.types';

export const EducationInfoModal = ({
  education,
  isOpen,
  onCloseEducationInfoTab,
  isLoading,
  onConfirm
}: {
  education: EmployeeEducation | undefined;
  isOpen: boolean;
  onCloseEducationInfoTab: () => void;
  isLoading: boolean;
  onConfirm: (
    values: EmployeeEducationInfoFormValues | ChangedEmployeeEducationInfoValues
  ) => void;
}) => {
  const [t] = useTranslation();

  const defaultData = useMemo(
    () => (education ? getInitialState(education) : initialEducationValues()),
    [education]
  );

  const methods = useForm<EmployeeEducationInfoFormValues>({
    defaultValues: defaultData,
    mode: 'onBlur',
    resolver: zodResolver(EmployeeEducationInfoSchema)
  });

  const { reset } = methods;

  useEffect(() => reset({ ...defaultData }), [reset, defaultData]);

  const closeEducationInfoForm = () => {
    methods.reset();
    onCloseEducationInfoTab();
  };

  return (
    <BaseModal
      autoFocus={false}
      title={t(
        'domains:employee.titles.profile_tabs.personal_information.education.section_title'
      ).toUpperCase()}
      isOpen={isOpen}
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
            const { startDate, endDate, ...payload } = data;

            const validDate = {
              started_at:
                startDate.startMonth !== null && startDate.startYear
                  ? getChangedDate(
                      Number(startDate.startYear),
                      Number(startDate.startMonth)
                    )
                  : new Date().toString(),
              graduated_at:
                endDate.endMonth !== null && endDate.endYear
                  ? getChangedDate(
                      Number(endDate.endYear),
                      Number(endDate.endMonth)
                    )
                  : null
            };

            if (!education) {
              onConfirm({
                ...payload,
                ...validDate
              });
            } else {
              const changedValues = Object.entries(payload).filter(
                (_, i) =>
                  Object.entries(data)[i][1] !==
                  Object.entries(getInitialState(education))[i][1]
              );

              const updateCertificate = Object.fromEntries(changedValues);

              onConfirm({
                ...updateCertificate,
                ...validDate
              });
            }
          })}
          isValid={methods.formState.isValid}
          isTouched={methods.formState.isDirty}
          isLoading={isLoading}
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
