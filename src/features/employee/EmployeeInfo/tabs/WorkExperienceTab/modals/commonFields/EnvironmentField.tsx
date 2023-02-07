import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';

import { type EmployeeWorkExperienceFormValues } from '../../WorkExperienceModal.schemas';

export const EnvironmentField = ({
  options
}: {
  options: { label: string; value: string }[];
}) => {
  const {
    field,
    fieldState: { error }
  } = useController<EmployeeWorkExperienceFormValues, `hard_skills`>({
    name: `hard_skills`
  });

  const [t] = useTranslation();

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
