import { useEffect, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import upperCase from 'lodash/upperCase';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { SIDE_PAGE_PADDING } from '~/shared/layout/layout.constants';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { useSuccessToast } from '~/shared/ui/components/Toast';
import { type SoftSkill } from '~/store/api/employees/employees.types';
import {
  useGetSoftSkillQuery,
  useUpdateSoftSkillsMutation
} from '~/store/api/softSkills/softSkills.api';

import {
  SoftSkillsInfoSchema,
  type EmployeeSoftSkillsFormValues
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

  const { data: softSkillsOpinions } = useGetSoftSkillQuery();
  const [updateSoftSkills] = useUpdateSoftSkillsMutation();

  const selectedSkill = useMemo(
    () =>
      skills.map((skill) => ({
        label: skill.name,
        value: skill.id
      })),
    [skills]
  );

  const methods = useForm<EmployeeSoftSkillsFormValues>({
    defaultValues: { skills: selectedSkill },
    mode: 'onBlur',
    resolver: zodResolver(SoftSkillsInfoSchema)
  });

  const { reset } = methods;

  const toast = useSuccessToast({
    description: 'Information updated',
    variant: 'toast',
    position: 'bottom-left',
    containerStyle: {
      marginLeft: SIDE_PAGE_PADDING,
      marginBottom: '20px'
    },
    duration: 5000
  });

  useEffect(() => {
    reset({ skills: selectedSkill }, { keepDefaultValues: false });
  }, [reset, selectedSkill]);

  return (
    <BaseModal
      autoFocus={false}
      title={upperCase(
        t('domains:employee.titles.profile_tabs.skills.soft_skills')
      )}
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
          onSubmit={methods.handleSubmit((data) => {
            updateSoftSkills({ skills: data.skills, id: Number(id) })
              .then(onCloseSoftSkillsInfo)
              .catch(onCloseSoftSkillsInfo);
            toast();
          })}
          isValid={methods.formState.isValid}
          isTouched={methods.formState.isDirty}
        />
      }
    >
      <FormProvider {...methods}>
        <SoftSkillField options={softSkillsOpinions || []} />
      </FormProvider>
    </BaseModal>
  );
};
