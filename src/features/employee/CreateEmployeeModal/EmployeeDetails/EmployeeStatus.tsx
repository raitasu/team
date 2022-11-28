import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type CreateEmployeeValues } from '~/features/employee/CreateEmployeeModal/employee.schema';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { EmployeeStatuses } from '~/store/api/employees/employees.schemas';

export const EmployeeStatus = () => {
  const [t] = useTranslation();
  const { field } = useController<CreateEmployeeValues, 'status'>({
    name: 'status'
  });

  const options = useMemo(
    () =>
      EmployeeStatuses.map((status) => ({
        value: status,
        label: t(`enums:employee_status.${status}`)
      })),
    [t]
  );

  return (
    <FormControl label={t('domains:employee.titles.status')}>
      <Select
        options={options}
        isMulti={false}
        value={options.find((option) => option.value === field.value)}
        onChange={(option) => {
          if (option) {
            field.onChange(option.value);
          }
        }}
      />
    </FormControl>
  );
};
