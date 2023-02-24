import { useEffect } from 'react';

import { Flex, Grid, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import isEqual from 'lodash/isEqual';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  type ChangedProjectMainInfoValues,
  ProjectInfoSchema,
  type ProjectMainInfoFormValues
} from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/EditMainInfo.schemas';
import { getInitialState } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/EditMainInfo.utils';
import { AvatarField } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/Fields/AvatarField';
import { BusinessDomainField } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/Fields/BusinessDomainField';
import { ChallengeField } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/Fields/ChallengeField';
import { CompanyNameField } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/Fields/CompanyNameField';
import { CountryField } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/Fields/CountryField';
import { DateField } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/Fields/DateField';
import { DescriptionField } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/Fields/DescriptionField';
import { ProjectNameField } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/Fields/ProjectNameField';
import { ProjectTypeField } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/Fields/ProjectTypeField';
import { ServiceAreaField } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/Fields/ServiceAreaField';
import { SolutionField } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/Fields/SolutionField';
import { StatusField } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/Fields/StatusField';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { type ProjectResponse } from '~/store/api/projects/projects.types';

export const EditMainInfoModal = ({
  project,
  isOpenMainInfoTab,
  onCloseMainInfoTab,
  onConfirm
}: {
  project: ProjectResponse;
  isOpenMainInfoTab: boolean;
  onCloseMainInfoTab: () => void;
  onConfirm: (values: ChangedProjectMainInfoValues) => void;
}) => {
  const { t } = useTranslation();
  const methods = useForm<ProjectMainInfoFormValues>({
    defaultValues: getInitialState(project),
    mode: 'onBlur',
    resolver: zodResolver(ProjectInfoSchema)
  });

  const { reset } = methods;
  const closeMainInfoForm = () => {
    methods.reset();
    onCloseMainInfoTab();
  };

  useEffect(() => {
    reset(getInitialState(project), { keepDefaultValues: false });
  }, [reset, project]);

  return (
    <BaseModal
      autoFocus={false}
      title={t(
        'domains:employee.titles.profile_tabs.personal_information.general.section_title'
      ).toUpperCase()}
      isOpen={isOpenMainInfoTab}
      onClose={closeMainInfoForm}
      shouldUseOverlay
      isCentered
      contentProps={{
        maxWidth: '688px',
        maxHeight: '80%',
        overflow: 'auto'
      }}
      footer={
        <ActionsModalFooter
          onCancel={closeMainInfoForm}
          onReset={() => methods.reset()}
          onSubmit={methods.handleSubmit((data) => {
            const initialValues = getInitialState(project);
            const updatedMainInformation = (
              Object.keys(data) as (keyof typeof data)[]
            ).reduce<Partial<typeof data>>((acc, key) => {
              const currentValue = data[key];
              const initialValue = initialValues[key];

              if (!isEqual(currentValue, initialValue)) {
                if (key === 'ended_at' || key === 'started_at') {
                  (acc[key] as typeof currentValue) =
                    data[key].year && data[key].month
                      ? new Date(
                          Number(data[key].year),
                          Number(data[key].month)
                        ).toISOString()
                      : null;
                } else {
                  (acc[key] as typeof currentValue) = currentValue;
                }
              }

              return acc;
            }, {});

            onConfirm(updatedMainInformation);
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
            <AvatarField onReset={() => methods.resetField('avatar')} />
            <Stack
              width="366px"
              spacing="20px"
            >
              <CompanyNameField />
              <ProjectNameField />
              <StatusField />
            </Stack>
          </Flex>
          <ProjectTypeField />
          <DateField />
          <CountryField />
          <BusinessDomainField />
          <ServiceAreaField />
          <DescriptionField />
          <ChallengeField />
          <SolutionField />
        </FormProvider>
      </Grid>
    </BaseModal>
  );
};
