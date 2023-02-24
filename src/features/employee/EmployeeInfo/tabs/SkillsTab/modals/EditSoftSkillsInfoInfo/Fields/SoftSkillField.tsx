import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { useGetSoftSkillQuery } from '~/store/api/softSkills/softSkills.api';

import { type EmployeeSoftSkillsFormValues } from '../EditSoftSkillsInfo.schemas';

export const SoftSkillField = () => {
  const [t] = useTranslation();

  const { field } = useController<EmployeeSoftSkillsFormValues, `skills`>({
    name: `skills`
  });

  const { data: softSkills } = useGetSoftSkillQuery();

  const softSkillsOptions = useMemo(
    () =>
      (softSkills || [])
        .map((option) => ({
          label: option.name,
          value: option.id
        }))
        .sort((a, b) => (a.label > b.label ? 1 : -1)),
    [softSkills]
  );

  const selectedSoftSkills = softSkillsOptions.filter((item) =>
    field.value.some((i) => i.value === item.value)
  );

  return (
    <FormControl>
      {softSkillsOptions.length > 0 ? (
        <Select
          placeholder={t('domains:filters.placeholders.placeholder_select')}
          options={softSkillsOptions}
          isMulti
          value={selectedSoftSkills}
          onChange={(option) => field.onChange(option)}
        />
      ) : null}
    </FormControl>
  );
};
