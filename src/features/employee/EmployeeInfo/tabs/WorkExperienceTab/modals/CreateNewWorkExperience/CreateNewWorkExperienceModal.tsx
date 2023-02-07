import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import upperCase from 'lodash/upperCase';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { toastConfig } from '~/shared/shared.constants';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { useGetHardSkillsQuery } from '~/store/api/hardSkills/hardSkills.api';
import { useGetPositionsQuery } from '~/store/api/positions/positions.api';
import {
  useCreateWorkExperienceMutation,
  useGetCustomersQuery
} from '~/store/api/workExperience/workExperience.api';

import {
  getChangedDate,
  getInitialStateForCreate,
  getOptions
} from '../../WorkExperience.utils';
import { EmployeeWorkExperienceSchema } from '../../WorkExperienceModal.schemas';
import { CompanyNameField } from '../commonFields/CompanyNameField';
import { DateField } from '../commonFields/DateFIeld';
import { DescriptionField } from '../commonFields/DescriptionField';
import { EnvironmentField } from '../commonFields/EnvironmentField';
import { PositionField } from '../commonFields/PositionNameField';
import { ProjectNameField } from '../commonFields/ProjectNameField';
import { ResponsibilitiesField } from '../commonFields/ResponsibilitiesField';

export const CreateNewWorkExperienceModal = ({
  isOpenCreateNewWorkExperienceModal,
  onCloseCreateNewWorkExperienceModal
}: {
  isOpenCreateNewWorkExperienceModal: boolean;
  onCloseCreateNewWorkExperienceModal: () => void;
}) => {
  const [t] = useTranslation();
  const { id } = useParams();
  const toastError = useErrorToast(toastConfig);
  const toastSuccess = useSuccessToast(toastConfig);
  const [createWorkExperience] = useCreateWorkExperienceMutation();
  const { data: environments } = useGetHardSkillsQuery();
  const { data: positions } = useGetPositionsQuery();
  const { data: customers } = useGetCustomersQuery();

  const methods = useForm({
    defaultValues: getInitialStateForCreate(),
    mode: 'onBlur',
    resolver: zodResolver(EmployeeWorkExperienceSchema)
  });

  return (
    <BaseModal
      autoFocus={false}
      title={upperCase(
        t('domains:employee.titles.profile_tabs.work_experience.title')
      )}
      isOpen={isOpenCreateNewWorkExperienceModal}
      onClose={onCloseCreateNewWorkExperienceModal}
      shouldUseOverlay
      isCentered
      contentProps={{
        maxWidth: '688px'
      }}
      footer={
        <ActionsModalFooter
          onCancel={() => {
            onCloseCreateNewWorkExperienceModal();
            methods.reset();
          }}
          onReset={() => methods.reset()}
          isValid={methods.formState.isValid}
          isTouched={methods.formState.isDirty}
          onSubmit={methods.handleSubmit(async (data) => {
            const { startDate, endDate, ...payload } = data;

            const workExperience = {
              company_name: payload.company_name || '',
              description: payload.description || '',
              hard_skill_ids: payload.hard_skills.map((item) =>
                Number(item.value)
              ),
              position_ids: payload.positions.map((item) => Number(item.value)),
              project_id: Number(payload.project_name.id),
              responsibilities: payload.responsibilities || '',
              ended_at:
                endDate.endMonth !== null && endDate.endYear
                  ? getChangedDate(
                      Number(endDate.endYear),
                      Number(endDate.endMonth)
                    )
                  : null,
              started_at: getChangedDate(
                Number(startDate.startYear),
                Number(startDate.startMonth)
              )
            };

            const response = await createWorkExperience({
              workExperience,
              employeesId: Number(id)
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
              onCloseCreateNewWorkExperienceModal();
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
          <EnvironmentField options={getOptions(environments)} />
        </FormProvider>
      </Flex>
    </BaseModal>
  );
};
