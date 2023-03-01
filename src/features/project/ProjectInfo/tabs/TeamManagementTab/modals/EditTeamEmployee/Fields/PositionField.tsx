import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EditTeamEmployeeFormValues } from '~/features/project/ProjectInfo/tabs/TeamManagementTab/modals/EditTeamEmployee/EditTeamEmployee.schema';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { useGetPositionsQuery } from '~/store/api/positions/positions.api';

export const PositionField = ({ index }: { index: number }) => {
  const {
    field,
    formState: { errors }
  } = useController<
    EditTeamEmployeeFormValues,
    `work_experience_positions.${number}.position_id`
  >({
    name: `work_experience_positions.${index}.position_id`
  });

  const { data: positions } = useGetPositionsQuery();

  const options = useMemo(
    () =>
      positions
        ? positions.map((item) => ({
            value: item.id,
            label: item.name
          }))
        : [],
    [positions]
  );

  const [t] = useTranslation();

  const selectedPosition = options.filter((item) => field.value === item.value);

  return (
    <FormControl
      label={t('domains:employee.titles.profile_tabs.work_experience.position')}
      isRequired
      errorMessage={
        errors.work_experience_positions?.[index]?.position_id?.message
          ? t(
              `general_errors:${
                errors.work_experience_positions[index]?.position_id
                  ?.message as 'required_field'
              }`
            )
          : undefined
      }
    >
      <Select
        {...field}
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        options={options}
        value={selectedPosition}
        onChange={(option) => {
          if (option) field.onChange(option.value);
        }}
        size="md"
      />
    </FormControl>
  );
};
