import { Textarea } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type ProjectMainInfoFormValues } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/EditMainInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';

export const SolutionField = () => {
  const { register } = useFormContext<ProjectMainInfoFormValues>();
  const { t } = useTranslation();

  return (
    <FormControl label={t('domains:projects.solution')}>
      <Textarea {...register('solution')} />
    </FormControl>
  );
};
