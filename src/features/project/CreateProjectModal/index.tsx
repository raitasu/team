import { Flex, Grid } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { toastConfig } from '~/shared/shared.constants';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { useCreateNewProjectMutation } from '~/store/api/projects/projects.api';

import {
  type CreateProjectFormValues,
  CreateProjectSchema,
  type EndDateType,
  type PartialProject,
  type StartDateType
} from './project.schema';
import { ProjectAvatar } from './ProjectAvatar';
import { CompanyName } from './ProjectDetails/CompanyName';
import { DateField } from './ProjectDetails/DateFIeld';
import { ProjectName } from './ProjectDetails/ProjectName';
import { ProjectStatus } from './ProjectDetails/ProjectStatus';
import { ProjectType } from './ProjectDetails/ProjectType';

export const CreateProjectModal = ({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [t] = useTranslation();

  const [createNewProject, { isLoading }] = useCreateNewProjectMutation();

  const methods = useForm<CreateProjectFormValues>({
    defaultValues: {
      avatar: null,
      name: '',
      company_name: { value: null, label: null },
      status: null,
      type: 'external',
      managers: [{ value: null, label: null }],
      startDate: {
        startMonth: null,
        startYear: null
      },
      endDate: {
        endMonth: null,
        endYear: null
      }
    },
    mode: 'onBlur',
    resolver: zodResolver(CreateProjectSchema)
  });

  const toastError = useErrorToast(toastConfig);
  const toastSuccess = useSuccessToast(toastConfig);

  const hasEmptyFields = (obj: EndDateType | StartDateType) =>
    Object.values(obj).includes(null) || Object.values(obj).includes('');

  const onProjectCreateSubmit = async (data: CreateProjectFormValues) => {
    const appliedFilters: PartialProject = Object.fromEntries(
      Object.entries(data).filter((item) => {
        if (
          item[0] === 'startDate' ||
          item[0] === 'endDate' ||
          item[0] === 'company_name'
        ) {
          return !hasEmptyFields(item[1] as EndDateType | StartDateType);
        }

        return item[1] !== null;
      })
    );

    const appliedManagerFilter = appliedFilters.managers?.filter(
      (language) => language.label
    );

    if (appliedManagerFilter?.length === 0) {
      delete appliedFilters.managers;
    }

    try {
      await createNewProject({
        project: appliedFilters
      }).unwrap();
      onClose();
      toastSuccess({
        description: t('domains:global.confirmations.descriptions.saved')
      });
    } catch (e) {
      console.error(e);
      toastError({
        description: t('domains:global.errors.descriptions.unknown_error')
      });
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      shouldUseOverlay
      title={t('domains:employee.actions.create_project').toUpperCase()}
      contentProps={{
        maxWidth: '962px',
        maxHeight: '80%',
        overflow: 'auto'
      }}
      footer={
        <ActionsModalFooter
          onCancel={onClose}
          onReset={() => methods.reset()}
          isValid={methods.formState.isValid}
          isTouched={methods.formState.isDirty}
          isLoading={isLoading}
          onSubmit={methods.handleSubmit(onProjectCreateSubmit)}
          submitTag="create"
        />
      }
    >
      <FormProvider {...methods}>
        <Grid
          templateColumns="250px 1fr"
          gap="20px"
        >
          <ProjectAvatar onReset={() => methods.resetField('avatar')} />
          <Flex
            flexDirection="column"
            gap="20px"
          >
            <ProjectName />
            <CompanyName />
            <DateField />
            <ProjectStatus />
            <ProjectType />
          </Flex>
        </Grid>
      </FormProvider>
    </BaseModal>
  );
};
