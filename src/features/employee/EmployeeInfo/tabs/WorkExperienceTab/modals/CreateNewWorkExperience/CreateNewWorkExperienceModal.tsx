import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import upperCase from 'lodash/upperCase';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { toastConfig } from '~/shared/shared.constants';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { useCreateWorkExperienceMutation } from '~/store/api/workExperience/workExperience.api';

import { getChangedDate, getInitialValues } from '../../WorkExperience.utils';
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
  onCloseCreateNewWorkExperienceModal,
  hiredAt
}: {
  isOpenCreateNewWorkExperienceModal: boolean;
  onCloseCreateNewWorkExperienceModal: () => void;
  hiredAt: string | null;
}) => {
  const [t] = useTranslation();
  const { id } = useParams();
  const toastError = useErrorToast(toastConfig);
  const toastSuccess = useSuccessToast(toastConfig);
  const [createWorkExperience] = useCreateWorkExperienceMutation();

  const methods = useForm({
    defaultValues: getInitialValues(undefined, hiredAt),
    mode: 'onBlur',
    resolver: zodResolver(EmployeeWorkExperienceSchema)
  });

  const closeForm = () => {
    onCloseCreateNewWorkExperienceModal();
    methods.reset();
  };

  return (
    <BaseModal
      autoFocus={false}
      title={upperCase(
        t('domains:employee.titles.profile_tabs.work_experience.title')
      )}
      isOpen={isOpenCreateNewWorkExperienceModal}
      onClose={closeForm}
      shouldUseOverlay
      isCentered
      contentProps={{
        maxWidth: '688px'
      }}
      footer={
        <ActionsModalFooter
          onCancel={closeForm}
          onReset={() => methods.reset()}
          isValid={methods.formState.isValid}
          isTouched={methods.formState.isDirty}
          onSubmit={methods.handleSubmit(async (data) => {
            const { started_at, ended_at, ...payload } = data;

            const workExperience = {
              company_name: payload.company_name || '',
              description: payload.description || '',
              hard_skill_ids: payload.hard_skills.map((item) =>
                Number(item.value)
              ),
              position_ids: payload.positions.map((item) => Number(item.value)),
              project_name: payload.project.name || '',
              responsibilities: payload.responsibilities || '',
              ended_at:
                ended_at.month !== null && ended_at.year
                  ? getChangedDate(
                      Number(ended_at.year),
                      Number(ended_at.month)
                    )
                  : null,
              started_at: getChangedDate(
                Number(started_at.year),
                Number(started_at.month)
              )
            };

            try {
              await createWorkExperience({
                workExperience,
                employeesId: Number(id)
              }).unwrap();

              toastSuccess({
                description: t(
                  'domains:employee.actions.created_new_work_experience'
                )
              });
              closeForm();
            } catch (e) {
              console.error(e);

              toastError({
                description: t('domains:employee.errors.unknown_error')
              });
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
          <CompanyNameField />
          <ProjectNameField />
          <PositionField />
          <DateField />
          <DescriptionField />
          <ResponsibilitiesField />
          <EnvironmentField isAll />
        </FormProvider>
      </Flex>
    </BaseModal>
  );
};
