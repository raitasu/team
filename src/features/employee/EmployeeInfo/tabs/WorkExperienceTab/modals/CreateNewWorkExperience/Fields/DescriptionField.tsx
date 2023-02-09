import { Textarea } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormControl } from '~/shared/ui/components/FormControl';

import { type EmployeeNewWorkExperienceFormValues } from '../CreateNewWorkExperienceModal.schemas';

export const DescriptionField = () => {
  const [t] = useTranslation();

  const {
    field,
    fieldState: { error }
  } = useController<EmployeeNewWorkExperienceFormValues, 'description'>({
    name: 'description'
  });

  return (
    <FormControl
      label={t(
        'domains:employee.titles.profile_tabs.work_experience.description'
      )}
      errorMessage={
        error?.message
          ? t(`general_errors:${error.message as 'required_field'}`)
          : undefined
      }
      isRequired
    >
      <Textarea
        {...field}
        value={field.value || ''}
        onChange={(e) => {
          field.onChange(e.currentTarget.value);
        }}
      />
    </FormControl>
  );
};
