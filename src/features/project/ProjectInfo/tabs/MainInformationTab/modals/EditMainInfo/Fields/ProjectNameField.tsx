import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type ProjectMainInfoFormValues } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/EditMainInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';

export const ProjectNameField = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<ProjectMainInfoFormValues>();
  const { t } = useTranslation();
  const errorMessage = errors.name?.message
    ? t(`general_errors:${errors.name.message as 'required_field'}`)
    : undefined;

  return (
    <FormControl
      label={t('domains:projects.project_name')}
      errorMessage={errorMessage}
      isRequired
    >
      <Input {...register('name')} />
    </FormControl>
  );
};
