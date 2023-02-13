import { useMemo } from 'react';

import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { useGetAllEmployeesQuery } from '~/store/api/employees/employees.api';

import { type CreateProjectFormValues } from '../project.schema';

export const ProjectManager = () => {
  const [t] = useTranslation();

  const { getValues, trigger } = useFormContext<CreateProjectFormValues>();

  const currentValues = getValues('managers');

  const { field } = useController<CreateProjectFormValues, `managers`>({
    name: `managers`
  });

  const { data } = useGetAllEmployeesQuery();

  const options = useMemo(
    () =>
      data
        ? data.map((employee) => ({
            value: String(employee.id),
            label: `${employee.first_name} ${employee.last_name}`
          }))
        : [],
    [data]
  );

  const filteredOptions = options.filter(
    (el) => !currentValues.some((item) => item.label === el.label)
  );

  const selectedEmployees = options.filter((item) =>
    field.value.some((i) => i.value === item.value)
  );

  return (
    <FormControl label={t('domains:projects.titles.manager')}>
      <Select
        isDisabled
        onBlur={() => trigger()}
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        options={filteredOptions}
        isMulti
        value={selectedEmployees}
        onChange={(option) => field.onChange(option)}
        menuPlacement="auto"
      />
    </FormControl>
  );
};
