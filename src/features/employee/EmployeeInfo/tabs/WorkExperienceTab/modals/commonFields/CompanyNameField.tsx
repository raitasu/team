import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';

import { type EmployeeWorkExperienceFormValues } from '../../WorkExperienceModal.schemas';

export const CompanyNameField = ({
  options
}: {
  options: { label: string; value: string }[];
}) => {
  const {
    field,
    fieldState: { error }
  } = useController<EmployeeWorkExperienceFormValues, `company_name`>({
    name: `company_name`
  });

  const { field: projectName } = useController<
    EmployeeWorkExperienceFormValues,
    `project_name`
  >({
    name: `project_name`
  });

  const [t] = useTranslation();

  const company = useMemo(
    () => (field.value ? { label: field.value, value: field.value } : null),
    [field.value]
  );

  const filteredOptions = options.filter(
    (item) => item.label !== company?.label
  );

  const selectedCompany = options.filter(
    (item) => item.label === company?.label
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
        options={filteredOptions}
        value={selectedCompany}
        onChange={(option) => {
          if (option) {
            projectName.onChange({ id: null, name: null });
            field.onChange(option.label);
          }
        }}
        size="md"
        menuPlacement="auto"
      />
    </FormControl>
  );
};
