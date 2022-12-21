import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeeFiltersForm } from '~/features/employees/Filters/employeeFiltersForm.schema';
import { getTranslation } from '~/services/i18n/i18n.utils';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { type EmployeePosition } from '~/store/api/employees/employees.types';

export const PositionField = ({
  positions
}: {
  positions: EmployeePosition[] | undefined;
}) => {
  const { field } = useController<EmployeeFiltersForm, 'positions'>({
    name: 'positions'
  });

  const [t, { language }] = useTranslation();

  const positionOptions = useMemo(
    () =>
      positions
        ? positions.map((position) => ({
            value: position.id,
            label: getTranslation(position.name_translations, language)
          }))
        : [],
    [language, positions]
  );

  const { value: currentValue } = field;
  const selectedPosition =
    currentValue !== null
      ? positionOptions.filter((position) =>
          currentValue.includes(position.value)
        )
      : null;

  return (
    <FormControl label={t('domains:filters.positions')}>
      <Select
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        options={positionOptions}
        value={selectedPosition}
        onChange={(option) => {
          field.onChange(
            option.length > 0 ? option.map((item) => item.value) : null
          );
        }}
        isMulti
        size="md"
      />
    </FormControl>
  );
};
