import { useEffect, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { toastConfig } from '~/shared/shared.constants';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { useSuccessToast } from '~/shared/ui/components/Toast';
import { type SoftSkill } from '~/store/api/employees/employees.types';
import { useUpdateSoftSkillsMutation } from '~/store/api/softSkills/softSkills.api';

import {
  type EmployeeSoftSkillsFormValues,
  SoftSkillsInfoSchema
} from './EditSoftSkillsInfo.schemas';
import { SoftSkillField } from './Fields/SoftSkillField';

export const EditSoftSkillsInfo = ({
  isOpenSoftSkillsInfo,
  onCloseSoftSkillsInfo,
  skills
}: {
  isOpenSoftSkillsInfo: boolean;
  onCloseSoftSkillsInfo: () => void;
  skills: SoftSkill[];
}) => {
  const [t] = useTranslation();

  const { id } = useParams();

  const [updateSoftSkills, { isLoading }] = useUpdateSoftSkillsMutation();

  const selectedSkill = useMemo(
    () =>
      skills.map((skill) => ({
        label: skill.name,
        value: skill.id
      })),
    [skills]
  );

  const methods = useForm({
    defaultValues: { skills: selectedSkill },
    mode: 'onBlur',
    resolver: zodResolver(SoftSkillsInfoSchema)
  });

  const { reset } = methods;

  const successToast = useSuccessToast(toastConfig);
  const errorToast = useSuccessToast(toastConfig);

  const onSubmit = async (data: EmployeeSoftSkillsFormValues) => {
    try {
      await updateSoftSkills({ skills: data.skills, id: Number(id) }).unwrap();
      onCloseSoftSkillsInfo();

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

  useEffect(() => {
    reset({ skills: selectedSkill }, { keepDefaultValues: false });
  }, [reset, selectedSkill]);

  return (
    <BaseModal
      autoFocus={false}
      title={t(
        'domains:employee.titles.profile_tabs.skills.soft_skills'
      ).toUpperCase()}
      isOpen={isOpenSoftSkillsInfo}
      onClose={() => {
        onCloseSoftSkillsInfo();
        methods.reset();
      }}
      shouldUseOverlay
      isCentered
      contentProps={{
        maxWidth: '688px'
      }}
      footer={
        <ActionsModalFooter
          onCancel={() => {
            onCloseSoftSkillsInfo();
            methods.reset();
          }}
          onReset={() => methods.reset()}
          onSubmit={methods.handleSubmit(onSubmit)}
          isValid={methods.formState.isValid}
          isTouched={methods.formState.isDirty}
          isLoading={isLoading}
        />
      }
    >
      <FormProvider {...methods}>
        <SoftSkillField />
      </FormProvider>
    </BaseModal>
  );
};
