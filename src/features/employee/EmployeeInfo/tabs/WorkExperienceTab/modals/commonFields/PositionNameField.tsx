import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { useGetPositionsQuery } from '~/store/api/positions/positions.api';

import { type EmployeeWorkExperienceFormValues } from '../../WorkExperienceModal.schemas';

export const PositionField = () => {
  const {
    field,
    fieldState: { error }
  } = useController<EmployeeWorkExperienceFormValues, `positions`>({
    name: `positions`
  });

  const { data: positions } = useGetPositionsQuery();

  const options = useMemo(
    () =>
      positions
        ? positions.map((item) => ({
            label: item.name,
            value: String(item.id)
          }))
        : [],
    [positions]
  );

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
