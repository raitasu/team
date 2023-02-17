import { useEffect } from 'react';

import { Flex, Grid, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import isEqual from 'lodash/isEqual';
import upperCase from 'lodash/upperCase';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { COLUMN_GAP } from '~/features/employee/employee.styles';
import { isCompanyProject } from '~/features/employee/employee.utils';
import { toastConfig } from '~/shared/shared.constants';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { type EmployeeWorkExperience } from '~/store/api/employees/employees.types';
import { useUpdateWorkExperienceMutation } from '~/store/api/workExperience/workExperience.api';

import { getInitialValues } from '../../WorkExperience.utils';
import { EmployeeWorkExperienceSchema } from '../../WorkExperienceModal.schemas';
import { CompanyNameField } from '../commonFields/CompanyNameField';
import { DateField } from '../commonFields/DateFIeld';
import { DescriptionField } from '../commonFields/DescriptionField';
import { EnvironmentField } from '../commonFields/EnvironmentField';
import { PositionField } from '../commonFields/PositionNameField';
import { ProjectNameField } from '../commonFields/ProjectNameField';
import { ResponsibilitiesField } from '../commonFields/ResponsibilitiesField';

export const EditWorkExperienceInfoModal = ({
  workExperience,
  isOpenWorkExperienceInfoTab,
  onCloseWorkExperienceInfoTab,
  hiredAt
}: {
  hiredAt: string;
  workExperience: EmployeeWorkExperience;
  isOpenWorkExperienceInfoTab: boolean;
  onCloseWorkExperienceInfoTab: () => void;
}) => {
  const [updateWorkExperience] = useUpdateWorkExperienceMutation();
  const toastError = useErrorToast(toastConfig);
  const toastSuccess = useSuccessToast(toastConfig);
  const { id } = useParams();
  const [t] = useTranslation();

  const methods = useForm({
    defaultValues: getInitialValues(workExperience),
    mode: 'onBlur',
    resolver: zodResolver(EmployeeWorkExperienceSchema)
  });

  const isEdit = isCompanyProject(
    hiredAt,
    workExperience.started_at,
    workExperience.ended_at
  );

  const { reset } = methods;

  useEffect(() => {
    reset(getInitialValues(workExperience), {
      keepDefaultValues: false
    });
  }, [reset, workExperience]);

  return (
    <BaseModal
      autoFocus={false}
      title={upperCase(
        t('domains:employee.titles.profile_tabs.work_experience.title')
      )}
      isOpen={isOpenWorkExperienceInfoTab}
      onClose={onCloseWorkExperienceInfoTab}
      shouldUseOverlay
      isCentered
      contentProps={{
        maxWidth: '688px'
      }}
      footer={
        <ActionsModalFooter
          onCancel={() => {
            onCloseWorkExperienceInfoTab();
            methods.reset();
          }}
          onReset={() => methods.reset()}
          isValid={methods.formState.isValid}
          isTouched={methods.formState.isDirty}
          onSubmit={methods.handleSubmit(async (formValues) => {
            const initialValues = getInitialValues(workExperience);

            const updatedWorkExperience = (
              Object.keys(formValues) as (keyof typeof formValues)[]
            ).reduce<Partial<typeof formValues>>((acc, key) => {
              const currentValue = formValues[key];
              const initialValue = initialValues[key];

              if (!isEqual(currentValue, initialValue)) {
                if (key === 'ended_at' || key === 'started_at') {
                  const newDate =
                    formValues[key].year && formValues[key].month
                      ? new Date(
                          Number(formValues[key].year),
                          Number(formValues[key].month)
                        ).toISOString()
                      : null;

                  (acc[key] as typeof currentValue) = newDate;
                } else {
                  (acc[key] as typeof currentValue) = currentValue;
                }
              }

              return acc;
            }, {});

            const response = await updateWorkExperience({
              workExperience: updatedWorkExperience,
              employeeId: Number(id),
              workExperienceId: workExperience.id
            });

            if ((response as { error?: FetchBaseQueryError }).error) {
              toastError({
                description: t('domains:employee.errors.unknown_error')
              });
            } else {
              toastSuccess({
                description: t(
                  'domains:employee.actions.created_new_work_experience'
                )
              });
              onCloseWorkExperienceInfoTab();
            }
          })}
          submitTag="save"
        />
      }
    >
      <Flex
        flexDirection="column"
        gap="20px"
      >
        <FormProvider {...methods}>
          {!isEdit && (
            <Grid
              gridTemplateColumns="1fr 1fr"
              gap={COLUMN_GAP}
            >
              <Text>
                <Text
                  as="span"
                  fontWeight="500"
                  color="brand.headline2"
                >
                  {`${t(
                    'domains:employee.titles.profile_tabs.work_experience.company_name'
                  )}: `}
                </Text>
                {workExperience.company_name ||
                  t('domains:employee.errors.no_data')}
              </Text>
              <Text>
                <Text
                  as="span"
                  fontWeight="500"
                  color="brand.headline2"
                >
                  {`${t(
                    'domains:employee.titles.profile_tabs.work_experience.project_name'
                  )}: `}
                </Text>
                {workExperience.project_name}
              </Text>
            </Grid>
          )}
          {isEdit && (
            <>
              <CompanyNameField />
              <ProjectNameField />
              <PositionField />
              <DateField />
              <DescriptionField />
            </>
          )}
          <ResponsibilitiesField />
          <EnvironmentField isAll={isEdit} />
        </FormProvider>
      </Flex>
    </BaseModal>
  );
};
