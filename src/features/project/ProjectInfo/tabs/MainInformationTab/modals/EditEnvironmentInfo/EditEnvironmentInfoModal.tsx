import { useEffect, useMemo } from 'react';

import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import groupBy from 'lodash/groupBy';
import upperCase from 'lodash/upperCase';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import {
  ProjectHardSkillsSchema,
  type ProjectHardSkillsSchemaFormValues
} from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditEnvironmentInfo/EditEnvironmentInfo.schema';
import { getInitialState } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditEnvironmentInfo/EditEnvironmentInfo.utils';
import { HardSkillField } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditEnvironmentInfo/Fields/HardSkillField';
import { toastConfig } from '~/shared/shared.constants';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { type CategoriesHardSkill } from '~/store/api/employees/employees.types';
import { useGetHardSkillsQuery } from '~/store/api/hardSkills/hardSkills.api';
import { useUpdateMainInfoMutation } from '~/store/api/projects/projects.api';
import { type ProjectResponse } from '~/store/api/projects/projects.types';

export const EditEnvironmentInfoModal = ({
  project,
  isOpenEnvironmentInfo,
  onCloseEnvironmentInfo
}: {
  project: ProjectResponse;
  isOpenEnvironmentInfo: boolean;
  onCloseEnvironmentInfo: () => void;
}) => {
  const [t] = useTranslation();
  const { data: allHardSkills } = useGetHardSkillsQuery();
  const { id } = useParams();
  const [updateMainInfo, { isLoading }] = useUpdateMainInfoMutation();
  const allHardSkillsByCategory = useMemo(
    () => groupBy(allHardSkills, 'category'),
    [allHardSkills]
  );
  const { hard_skills: hardSkills } = project;

  const methods = useForm({
    defaultValues: getInitialState(hardSkills),
    mode: 'onBlur',
    resolver: zodResolver(ProjectHardSkillsSchema)
  });

  const errorToast = useErrorToast(toastConfig);
  const successToast = useSuccessToast(toastConfig);

  const { reset } = methods;

  useEffect(() => {
    reset(getInitialState(hardSkills), { keepDefaultValues: false });
  }, [reset, hardSkills]);

  const onSubmit = async (data: ProjectHardSkillsSchemaFormValues) => {
    try {
      const result: Array<number> = [];

      Object.entries(data).forEach((item) => result.push(...item[1]));
      await updateMainInfo({
        data: { hard_skill_ids: result },
        id: Number(id)
      }).unwrap();
      onCloseEnvironmentInfo();
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

  return (
    <BaseModal
      autoFocus={false}
      title={upperCase(
        `${t(
          'domains:employee.titles.profile_tabs.work_experience.environment'
        )}`
      )}
      isOpen={isOpenEnvironmentInfo}
      onClose={onCloseEnvironmentInfo}
      shouldUseOverlay
      isCentered
      footer={
        <ActionsModalFooter
          onCancel={() => {
            onCloseEnvironmentInfo();
            methods.reset();
          }}
          onReset={() => methods.reset()}
          isValid={methods.formState.isValid}
          isTouched={methods.formState.isDirty}
          isLoading={isLoading}
          onSubmit={methods.handleSubmit(onSubmit)}
          submitTag="save"
        />
      }
    >
      <FormProvider {...methods}>
        <Flex
          gap="20px"
          flexDirection="column"
        >
          {Object.keys(allHardSkillsByCategory).map((item) => (
            <HardSkillField
              key={item}
              label={item as CategoriesHardSkill}
              hardSkills={allHardSkillsByCategory[item as CategoriesHardSkill]}
            />
          ))}
        </Flex>
      </FormProvider>
    </BaseModal>
  );
};
