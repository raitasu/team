import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type ProjectMainInfoFormValues } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/EditMainInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { ProjectStatuses } from '~/store/api/employees/employees.schemas';

export const StatusField = () => {
  const [t] = useTranslation();
  const { field } = useController<ProjectMainInfoFormValues, 'status'>({
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

  return (
    <FormControl
      label={t('domains:employee.titles.status')}
      isRequired
    >
      <Select
        options={options}
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
