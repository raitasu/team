import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  type HardSkillsCategory,
  type ProjectHardSkillsSchemaFormValues
} from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditEnvironmentInfo/EditEnvironmentInfo.schema';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { type CategoriesHardSkill } from '~/store/api/employees/employees.types';

export const HardSkillField = ({
  hardSkills,
  label
}: {
  label: CategoriesHardSkill;
  hardSkills: HardSkillsCategory;
}) => {
  const [t] = useTranslation();
  const { field } = useController<
    ProjectHardSkillsSchemaFormValues,
    CategoriesHardSkill
  >({
    name: label
  });
  const backendOptions = useMemo(
    () =>
      hardSkills
        ? hardSkills.map((item) => ({
            value: item.id,
            label: item.name
          }))
        : [],
    [hardSkills]
  );

  const selectedHardSkill = backendOptions.filter((item) =>
    field.value.some((el) => el === item.value)
  );

  return (
    <FormControl
      label={t(`domains:employee.titles.profile_tabs.skills.category.${label}`)}
    >
      <Select
        isMulti
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        options={backendOptions}
        value={selectedHardSkill}
        onChange={(option) => {
          field.onChange(option.map((item) => item.value));
        }}
        size="md"
      />
    </FormControl>
  );
};
