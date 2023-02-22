import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type ProjectMainInfoFormValues } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/EditMainInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { ProjectTypes } from '~/store/api/employees/employees.schemas';

export const ProjectTypeField = () => {
  const [t] = useTranslation();
  const { field } = useController<ProjectMainInfoFormValues, 'project_type'>({
    name: 'project_type'
  });

  const options = useMemo(
    () =>
      ProjectTypes.map((type) => ({
        value: type,
        label: t(`domains:projects.type.${type}`)
      })),
    [t]
  );

  return (
    <FormControl label={t('domains:projects.project_type')}>
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
