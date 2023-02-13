import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormControl } from '~/shared/ui/components/FormControl';

import { type CreateProjectFormValues } from '../project.schema';

export const ProjectName = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<CreateProjectFormValues>();
  const [t] = useTranslation();

  return (
    <FormControl
      isRequired
      errorMessage={
        errors.name?.message
          ? t(`general_errors:${errors.name.message as 'required_field'}`)
          : undefined
      }
      label={t('domains:projects.titles.project_name')}
    >
      <Input
        placeholder={t('general_placeholders:enter_text')}
        {...register('name')}
      />
    </FormControl>
  );
};
