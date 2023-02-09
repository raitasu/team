import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';

import { type EmployeeNewWorkExperienceFormValues } from '../CreateNewWorkExperienceModal.schemas';

export const CompanyNameField = ({
  options
}: {
  options: { label: string; value: string }[];
}) => {
  const {
    field,
    fieldState: { error }
  } = useController<EmployeeNewWorkExperienceFormValues, `company_name`>({
    name: `company_name`
  });

  const { field: projectName } = useController<
    EmployeeNewWorkExperienceFormValues,
    `project_name`
  >({
    name: `project_name`
  });

  const [t] = useTranslation();

  const selectedCompanyName = useMemo(
    () => (field.value ? { label: field.value, value: field.value } : null),
    [field.value]
  );

  return (
    <FormControl
      label={t(
        'domains:employee.titles.profile_tabs.work_experience.company_name'
      )}
      isRequired
      errorMessage={
        error?.message
          ? t(`general_errors:${error.message as 'required_field'}`)
          : undefined
      }
    >
      <Select
        {...field}
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        options={options}
        value={selectedCompanyName}
        onChange={(option) => {
          projectName.onChange({ id: null, name: null });
          field.onChange(option?.label);
        }}
        size="md"
        menuPlacement="auto"
      />
    </FormControl>
  );
};
