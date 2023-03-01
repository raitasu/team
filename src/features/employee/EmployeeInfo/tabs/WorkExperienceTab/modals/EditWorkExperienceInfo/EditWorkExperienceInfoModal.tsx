import { useEffect } from 'react';

import { Flex, Grid, Link, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import isEqual from 'lodash/isEqual';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

import { COLUMN_GAP } from '~/features/employee/employee.styles';
import { isCompanyProject } from '~/features/employee/employee.utils';
import { toastConfig } from '~/shared/shared.constants';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { type EmployeeWorkExperience } from '~/store/api/employees/employees.types';
import { useUpdateWorkExperienceMutation } from '~/store/api/workExperience/workExperience.api';

import { getInitialValues, transformData } from '../../WorkExperience.utils';
import {
  EmployeeWorkExperienceSchema,
  ShortEmployeeWorkExperienceSchema
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
  onCloseWorkExperienceInfoTab,
  hiredAt
}: {
  hiredAt: string;
  workExperience: EmployeeWorkExperience;
  isOpenWorkExperienceInfoTab: boolean;
  onCloseWorkExperienceInfoTab: () => void;
}) => {
  const [updateWorkExperience, { isLoading }] =
    useUpdateWorkExperienceMutation();
  const toastError = useErrorToast(toastConfig);
  const toastSuccess = useSuccessToast(toastConfig);
  const { id } = useParams();
  const [t] = useTranslation();

  const isEdit = isCompanyProject(
    hiredAt,
    workExperience.started_at,
    workExperience.ended_at as string
  );
  const methods = useForm({
    defaultValues: getInitialValues(workExperience),
    mode: 'onBlur',
    resolver: zodResolver(
      isEdit ? EmployeeWorkExperienceSchema : ShortEmployeeWorkExperienceSchema
    )
  });

  const { reset } = methods;

  useEffect(() => {
    reset(getInitialValues(workExperience), {
      keepDefaultValues: false
    });
  }, [reset, workExperience]);

  return (
    <BaseModal
      autoFocus={false}
      title={t(
        'domains:employee.titles.profile_tabs.work_experience.title'
      ).toUpperCase()}
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
          isLoading={isLoading}
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
                (acc[key] as typeof currentValue) = currentValue;
              }

              return acc;
            }, {});

            try {
              await updateWorkExperience({
                workExperience: transformData(updatedWorkExperience),
                employeeId: Number(id),
                workExperienceId: workExperience.id
              }).unwrap();

              toastSuccess({
                description: t(
                  'domains:global.confirmations.descriptions.saved'
                )
              });
              onCloseWorkExperienceInfoTab();
            } catch (e) {
              console.error(e);

              toastError({
                description: t(
                  'domains:global.errors.descriptions.unknown_error'
                )
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
                <Link
                  as={NavLink}
                  to={`/projects/${workExperience.project.id}`}
                >
                  {workExperience.project.name}
                </Link>
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
