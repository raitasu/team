import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type ProjectMainInfoFormValues } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/EditMainInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { useGetHardSkillsQuery } from '~/store/api/hardSkills/hardSkills.api';

export const ServiceAreaField = () => {
  const [t] = useTranslation();
  const { field } = useController<ProjectMainInfoFormValues, 'hard_skill_ids'>({
    name: 'hard_skill_ids'
  });

  const { data: hardSkills } = useGetHardSkillsQuery();

  const hardSkillsOptions = useMemo(
    () =>
      hardSkills
        ? hardSkills.map((item) => ({
            value: item.id,
            label: item.name
          }))
        : [],
    [hardSkills]
  );

  const selectedHardSkill = hardSkillsOptions.filter((item) =>
    field.value.some((el) => el === item.value)
  );

  return (
    <FormControl label={t('domains:projects.service_area')}>
      <Select
        isMulti
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        options={hardSkillsOptions}
        value={selectedHardSkill}
        onChange={(option) => {
          field.onChange(
            option.length > 0 ? option.map((item) => item.value) : []
          );
        }}
        size="md"
      />
    </FormControl>
  );
};
