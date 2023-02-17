import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { useGetHardSkillsQuery } from '~/store/api/hardSkills/hardSkills.api';
import { useGetCompanyHardSkillsQuery } from '~/store/api/workExperience/workExperience.api';

import { type EmployeeWorkExperienceFormValues } from '../../WorkExperienceModal.schemas';

export const EnvironmentField = ({ isAll }: { isAll?: boolean }) => {
  const {
    field,
    fieldState: { error }
  } = useController<EmployeeWorkExperienceFormValues, `hard_skills`>({
    name: `hard_skills`
  });

  const { field: projectName } = useController<
    EmployeeWorkExperienceFormValues,
    `project_name`
  >({
    name: `project_name`
  });

  const { data: companyHardSkills } = useGetCompanyHardSkillsQuery(
    projectName.value.name ? projectName.value.name : ''
  );

  const [t] = useTranslation();

  const { data: hardSkills } = useGetHardSkillsQuery();

  const environments = isAll ? hardSkills : companyHardSkills;

  const options = useMemo(
    () =>
      environments
        ? environments.map((item) => ({
            label: item.name,
            value: String(item.id)
          }))
        : [],
    [environments]
  );

  const selectedPositions = options.filter((item) =>
    field.value.some((el) => el.label === item.label)
  );

  return (
    <FormControl
      label={t(
        'domains:employee.titles.profile_tabs.work_experience.environment'
      )}
      isRequired
      errorMessage={
        error?.message
          ? t(`general_errors:${error.message as 'required_field'}`)
          : undefined
      }
    >
      <Select
        {...field}
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        options={options}
        value={selectedPositions}
        onChange={(option) => {
          field.onChange(option);
        }}
        isMulti
        size="md"
        menuPlacement="auto"
      />
    </FormControl>
  );
};
