import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeeFiltersForm } from '~/features/employees/Filters/employeeFiltersForm.schema';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { type HardSkill } from '~/store/api/employees/employees.types';

export const HardSkillField = ({
  hardSkills
}: {
  hardSkills: HardSkill[] | undefined;
}) => {
  const { field } = useController<EmployeeFiltersForm, 'hard_skills'>({
    name: 'hard_skills'
  });
  const [t] = useTranslation();

  const hardSkillsOptions = useMemo(
    () =>
      hardSkills
        ? hardSkills.map((hardSkill) => ({
            value: hardSkill.id,
            label: hardSkill.name
          }))
        : [],
    [hardSkills]
  );
  const { value: currentValue } = field;

  const selectedHardSkill =
    currentValue !== null
      ? hardSkillsOptions.filter((hardSkill) =>
          currentValue.includes(hardSkill.value)
        )
      : null;

  return (
    <FormControl label={t('domains:filters.hard_skills')}>
      <Select
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        options={hardSkillsOptions}
        value={selectedHardSkill}
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
