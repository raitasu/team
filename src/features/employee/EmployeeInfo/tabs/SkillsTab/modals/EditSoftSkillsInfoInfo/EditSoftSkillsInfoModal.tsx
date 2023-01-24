import { zodResolver } from '@hookform/resolvers/zod';
import upperCase from 'lodash/upperCase';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { getTranslation } from '~/services/i18n/i18n.utils';
import { SIDE_PAGE_PADDING } from '~/shared/layout/layout.constants';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { useSuccessToast } from '~/shared/ui/components/Toast';
import { type SoftSkill } from '~/store/api/employees/employees.types';

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
  const [t, { language }] = useTranslation();

  const selectedSkill = skills.map((opinion) => ({
    label: getTranslation(opinion.name_translations, language),
    value: opinion.id
  }));

  const methods = useForm<EmployeeSoftSkillsFormValues>({
    defaultValues: { skills: selectedSkill },
    mode: 'onBlur',
    resolver: zodResolver(SoftSkillsInfoSchema)
  });

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

  return (
    <BaseModal
      autoFocus={false}
      title={upperCase(
        t('domains:employee.titles.profile_tabs.skills.soft_skills')
      )}
      isOpen={isOpenSoftSkillsInfo}
      onClose={onCloseSoftSkillsInfo}
      shouldUseOverlay
      isCentered
      contentProps={{
        maxWidth: '688px'
      }}
      footer={
        <ActionsModalFooter
          onCancel={() => onCloseSoftSkillsInfo()}
          onReset={() => methods.reset()}
          onSubmit={methods.handleSubmit((data) => {
            console.debug(data.skills);
            onCloseSoftSkillsInfo();
            toast();
          })}
          isValid={methods.formState.isValid}
          isTouched={methods.formState.isDirty}
        />
      }
    >
      <FormProvider {...methods}>
        <SoftSkillField />
      </FormProvider>
    </BaseModal>
  );
};
