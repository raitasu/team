import { Textarea } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormControl } from '~/shared/ui/components/FormControl';

import { type EmployeeWorkExperienceFormValues } from '../../WorkExperienceModal.schemas';

export const ResponsibilitiesField = () => {
  const [t] = useTranslation();

  const {
    field,
    fieldState: { error }
  } = useController<EmployeeWorkExperienceFormValues, 'responsibilities'>({
    name: 'responsibilities'
  });

  return (
    <FormControl
      label={t(
        'domains:employee.titles.profile_tabs.work_experience.responsibilities'
      )}
      isRequired
      errorMessage={
        error?.message
          ? t(`general_errors:${error.message as 'required_field'}`)
          : undefined
      }
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
