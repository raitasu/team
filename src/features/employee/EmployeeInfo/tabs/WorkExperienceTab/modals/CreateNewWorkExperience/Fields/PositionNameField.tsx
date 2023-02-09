import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';

import { type EmployeeNewWorkExperienceFormValues } from '../CreateNewWorkExperienceModal.schemas';

export const PositionField = ({
  options
}: {
  options: {
    label: string;
    value: string;
  }[];
}) => {
  const {
    field,
    fieldState: { error }
  } = useController<EmployeeNewWorkExperienceFormValues, `positions`>({
    name: `positions`
  });

  const [t] = useTranslation();

  const selectedPositions = options.filter((item) =>
    field.value.some((el) => el.label === item.label)
  );

  return (
    <FormControl
      label={t('domains:employee.titles.profile_tabs.work_experience.position')}
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
        size="md"
        isMulti
      />
    </FormControl>
  );
};
