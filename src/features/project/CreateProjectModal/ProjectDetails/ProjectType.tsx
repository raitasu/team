import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { ProjectTypes } from '~/store/api/employees/employees.schemas';

import { type CreateProjectFormValues } from '../project.schema';

export const ProjectType = () => {
  const [t] = useTranslation();
  const { field } = useController<CreateProjectFormValues, 'type'>({
    name: 'type'
  });

  const options = useMemo(
    () =>
      ProjectTypes.map((status) => ({
        value: status,
        label: t(`domains:projects.type.${status}`)
      })),
    [t]
  );

  const selectedType = useMemo(
    () => options.find((item) => item.value === field.value),
    [field.value, options]
  );

  return (
    <FormControl
      label={t('domains:projects.titles.type')}
      isRequired
    >
      <Select
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        options={options}
        value={selectedType}
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
