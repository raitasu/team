import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { type SoftSkill } from '~/store/api/employees/employees.types';

import { type EmployeeSoftSkillsFormValues } from '../EditSoftSkillsInfo.schemas';

export const SoftSkillField = ({ options }: { options: SoftSkill[] | [] }) => {
  const [t] = useTranslation();

  const { field } = useController<EmployeeSoftSkillsFormValues, `skills`>({
    name: `skills`
  });

  const softSkillsOptions = options.map((option) => ({
    label: option.name,
    value: option.id
  }));

  const selectedSoftSkills = softSkillsOptions.filter((item) =>
    field.value.some((i) => i.value === item.value)
  );

  return (
    <FormControl>
      <Select
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        options={softSkillsOptions}
        isMulti
        value={selectedSoftSkills}
        onChange={(option) => field.onChange(option)}
      />
    </FormControl>
  );
};
