import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { useGetCustomersQuery } from '~/store/api/workExperience/workExperience.api';

import { type EmployeeWorkExperienceFormValues } from '../../WorkExperienceModal.schemas';

export const CompanyNameField = () => {
  const {
    field,
    fieldState: { error }
  } = useController<EmployeeWorkExperienceFormValues, `company_name`>({
    name: `company_name`
  });
  const { data: customers } = useGetCustomersQuery();

  const options = useMemo(
    () =>
      customers
        ? customers.map((item) => ({
            label: item.name,
            value: String(item.id)
          }))
        : [],
    [customers]
  );

  const { field: project } = useController<
    EmployeeWorkExperienceFormValues,
    `project`
  >({
    name: `project`
  });

  const [t] = useTranslation();

  const company = useMemo(
    () => (field.value ? { label: field.value, value: field.value } : null),
    [field.value]
  );

  const filteredOptions = options.filter(
    (item) => item.label !== company?.label
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
        value={company}
        isClearable
        onChange={(option) => {
          if (option) {
            project.onChange({ id: null, name: null });
            field.onChange(option.label);
          }
        }}
        size="md"
        menuPlacement="auto"
      />
    </FormControl>
  );
};
