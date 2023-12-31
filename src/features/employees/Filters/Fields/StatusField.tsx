import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeeFiltersForm } from '~/features/employees/Filters/employeeFiltersForm.schema';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { EmployeeStatuses } from '~/store/api/employees/employees.schemas';

export const StatusField = () => {
  const [t] = useTranslation();
  const { field } = useController<EmployeeFiltersForm, 'statuses'>({
    name: 'statuses'
  });
  const statusOptions = useMemo(
    () =>
      EmployeeStatuses.map((status) => ({
        value: status,
        label: t(`enums:employee_status.${status}`)
      })),
    [t]
  );

  const { value: currentValue } = field;

  const selectedStatus =
    currentValue !== null
      ? statusOptions.filter((status) => currentValue.includes(status.value))
      : null;

  return (
    <FormControl label={t('domains:filters.status')}>
      <Select
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        options={statusOptions}
        value={selectedStatus}
        onChange={(option) => {
          field.onChange(
            option.length > 0 ? option.map((item) => item.value) : null
          );
        }}
        isMulti
        size="md"
      />
    </FormControl>
  );
};
