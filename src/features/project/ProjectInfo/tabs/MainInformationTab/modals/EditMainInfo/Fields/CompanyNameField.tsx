import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type ProjectMainInfoFormValues } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/EditMainInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';

export const CompanyNameField = () => {
  const { register } = useFormContext<ProjectMainInfoFormValues>();
  const { t } = useTranslation();

  return (
    <FormControl label={t('domains:projects.company_name')}>
      <Input {...register('customer_name')} />
    </FormControl>
  );
};
