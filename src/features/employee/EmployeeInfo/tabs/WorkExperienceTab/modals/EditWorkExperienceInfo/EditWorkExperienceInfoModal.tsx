import { useEffect } from 'react';

import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import isEqual from 'lodash/isEqual';
import upperCase from 'lodash/upperCase';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { toastConfig } from '~/shared/shared.constants';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { type EmployeeWorkExperience } from '~/store/api/employees/employees.types';
import { useGetPositionsQuery } from '~/store/api/positions/positions.api';
import {
  useGetCustomersQuery,
  useUpdateWorkExperienceMutation
} from '~/store/api/workExperience/workExperience.api';

import {
  // getInitialStateForCreate,
  getInitialStateForUpdate,
  getOptions
} from '../../WorkExperience.utils';
import {
  EmployeeWorkExperienceSchema,
  type EndDateType,
  type PartialWorkExperience,
  type StartDateType,
  type EmployeeWorkExperienceFormValues
} from '../../WorkExperienceModal.schemas';
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
  onCloseWorkExperienceInfoTab
}: {
  workExperience: EmployeeWorkExperience;
  isOpenWorkExperienceInfoTab: boolean;
  onCloseWorkExperienceInfoTab: () => void;
}) => {
  const [updateWorkExperience] = useUpdateWorkExperienceMutation();
  const { data: customers } = useGetCustomersQuery();
  const { data: positions } = useGetPositionsQuery();
  const toastError = useErrorToast(toastConfig);
  const toastSuccess = useSuccessToast(toastConfig);
  const { id } = useParams();
  const [t] = useTranslation();

  const methods = useForm<EmployeeWorkExperienceFormValues>({
    defaultValues: getInitialStateForUpdate(workExperience),
    mode: 'onBlur',
    resolver: zodResolver(EmployeeWorkExperienceSchema)
  });

  const { reset } = methods;

  useEffect(() => {
    reset(getInitialStateForUpdate(workExperience), {
      keepDefaultValues: false
    });
  }, [reset, workExperience]);

  const hasEmptyFields = (obj: EndDateType | StartDateType) =>
    Object.values(obj).includes(null) || Object.values(obj).includes('');

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
          onSubmit={methods.handleSubmit(async (data) => {
            // const updatedWorkExperience: EmployeeWorkExperienceFormValues =
            //   getInitialStateForCreate();

            // (
            //   Object.keys(data) as (keyof EmployeeWorkExperienceFormValues)[]
            // ).forEach((key) => {
            //   if (
            //     !isEqual(
            //       data[key],
            //       getInitialStateForUpdate(workExperience)[key]
            //     )
            //   ) {
            //     updatedWorkExperience[key] = data[key];
            //   } else {
            //     delete updatedWorkExperience[key];
            //   }
            // });

            const updatedWorkExperience: PartialWorkExperience =
              Object.fromEntries(
                Object.entries(data).filter((item, i) => {
                  if (item[0] === 'startDate' || item[0] === 'endDate') {
                    return hasEmptyFields(
                      item[1] as EndDateType | StartDateType
                    );
                  }

                  return !isEqual(
                    Object.entries(data)[i][1],
                    Object.entries(getInitialStateForUpdate(workExperience))[
                      i
                    ][1]
                  );
                })
              );

            const response = await updateWorkExperience({
              workExperience: updatedWorkExperience,
              employeesId: Number(id),
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
          <CompanyNameField options={getOptions(customers)} />
          <ProjectNameField />
          <PositionField options={getOptions(positions)} />
          <DateField />
          <DescriptionField />
          <ResponsibilitiesField />
          <EnvironmentField options={[]} />
        </FormProvider>
      </Flex>
    </BaseModal>
  );
};
