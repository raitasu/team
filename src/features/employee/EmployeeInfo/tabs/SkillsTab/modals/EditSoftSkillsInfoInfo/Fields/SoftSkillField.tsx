import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { opinions } from '~/mocks/employees/fixtures/softSkills';
import { getTranslation } from '~/services/i18n/i18n.utils';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';

import { type EmployeeSoftSkillsFormValues } from '../EditSoftSkillsInfo.schemas';

export const SoftSkillField = () => {
  const [t, { language }] = useTranslation();

  const { field } = useController<EmployeeSoftSkillsFormValues, `skills`>({
    name: `skills`
  });

  const softSkillsOpinions = opinions.map((opinion) => ({
    label: getTranslation(opinion.name_translations, language),
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
