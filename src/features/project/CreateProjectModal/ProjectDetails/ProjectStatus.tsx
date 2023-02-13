import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { ProjectStatuses } from '~/store/api/employees/employees.schemas';

import { type CreateProjectFormValues } from '../project.schema';

export const ProjectStatus = () => {
  const [t] = useTranslation();
  const { field } = useController<CreateProjectFormValues, 'status'>({
    name: 'status'
  });

  const options = useMemo(
    () =>
      ProjectStatuses.map((status) => ({
        value: status,
        label: t(`domains:projects.status.${status}`)
      })),
    [t]
  );

  const selectedStatus = useMemo(
    () =>
      field.value !== null
        ? options.find((item) => item.value === field.value)
        : null,
    [field.value, options]
  );

  return (
    <FormControl label={t('domains:projects.titles.status')}>
      <Select
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        options={options}
        value={selectedStatus}
        onChange={(option) => {
          if (option) {
            field.onChange(option.value);
          }
        }}
        size="md"
      />
    </FormControl>
  );
};
