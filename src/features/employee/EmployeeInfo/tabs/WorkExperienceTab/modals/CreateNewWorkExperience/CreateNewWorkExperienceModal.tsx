import { useCallback } from 'react';

import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import upperCase from 'lodash/upperCase';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import {
  type EmployeePosition,
  type Customers,
  type HardSkill
} from '~/store/api/employees/employees.types';
import { useGetHardSkillsQuery } from '~/store/api/hardSkills/hardSkills.api';
import { useGetPositionsQuery } from '~/store/api/positions/positions.api';
import {
  useCreateWorkExperienceMutation,
  useGetCustomersQuery
} from '~/store/api/workExperience/workExperience.api';

import { EmployeeNewWorkExperienceSchema } from './CreateNewWorkExperienceModal.schemas';
import { CompanyNameField } from './Fields/CompanyNameField';
import { DateField } from './Fields/DateFIeld';
import { DescriptionField } from './Fields/DescriptionField';
import { EnvironmentField } from './Fields/EnvironmentField';
import { PositionField } from './Fields/PositionNameField';
import { ProjectNameField } from './Fields/ProjectNameField';
import { ResponsibilitiesField } from './Fields/ResponsibilitiesField';
import { getChangedDate, getInitialState } from '../../WorkExperience.utils';

export const CreateNewWorkExperienceModal = ({
  isOpenCreateNewWorkExperienceModal,
  onCloseCreateNewWorkExperienceModal
}: {
  isOpenCreateNewWorkExperienceModal: boolean;
  onCloseCreateNewWorkExperienceModal: () => void;
}) => {
  const [t] = useTranslation();
  const { id } = useParams();

  const [createWorkExperience] = useCreateWorkExperienceMutation();
  const { data: environments } = useGetHardSkillsQuery();
  const { data: positions } = useGetPositionsQuery();
  const { data: customers } = useGetCustomersQuery();

  const methods = useForm({
    defaultValues: getInitialState(),
    mode: 'onBlur',
    resolver: zodResolver(EmployeeNewWorkExperienceSchema)
  });

  const getOptions = useCallback(
    (value: Customers[] | HardSkill[] | EmployeePosition[] | undefined) =>
      value
        ? value.map((item) => ({
            label: item.name,
            value: String(item.id)
          }))
        : [],
    []
  );

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
          onSubmit={methods.handleSubmit((data) => {
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

            createWorkExperience({
              workExperience,
              employeesId: Number(id)
            })
              .then(() => {
                onCloseCreateNewWorkExperienceModal();
                methods.reset();
              })
              .catch(onCloseCreateNewWorkExperienceModal);
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
