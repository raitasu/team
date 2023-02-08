import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { opinions } from '~/mocks/employees/fixtures/softSkills';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';

import { type EmployeeSoftSkillsFormValues } from '../EditSoftSkillsInfo.schemas';

export const SoftSkillField = () => {
  const [t] = useTranslation();

  const { field } = useController<EmployeeSoftSkillsFormValues, `skills`>({
    name: `skills`
  });

  const softSkillsOpinions = opinions.map((opinion) => ({
    label: opinion.name,
    value: opinion.id
  }));

  const selectedSoftSkills = softSkillsOpinions.filter((item) =>
    field.value.some((i) => i.value === item.value)
  );

  return (
    <FormControl>
      <Select
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        options={softSkillsOpinions}
        isMulti
        value={selectedSoftSkills}
        onChange={(option) => field.onChange(option)}
      />
    </FormControl>
  );
};
