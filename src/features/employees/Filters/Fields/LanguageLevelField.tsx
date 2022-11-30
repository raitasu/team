import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeeFilterValues } from '~/features/employees/Filters/employeesFilters.schema';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { EmployeeLanguageLevel } from '~/store/api/employees/employees.schemas';

export const LanguageLevelField = () => {
  const [t] = useTranslation();
  const { field } = useController<EmployeeFilterValues, 'language_level'>({
    name: 'language_level'
  });
  const languageLevelOptions = useMemo(
    () =>
      EmployeeLanguageLevel.map((level) => ({
        value: level,
        label: t(`enums:language_level.${level}`)
      })),
    [t]
  );

  const { value: currentValue } = field;

  const selectedLanguageLevel =
    currentValue !== null
      ? languageLevelOptions.filter((languageLevel) =>
          currentValue.includes(languageLevel.value)
        )
      : null;

  return (
    <FormControl label={t('domains:filters.language_level')}>
      <Select
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        value={selectedLanguageLevel}
        options={languageLevelOptions}
        onChange={(option) => {
          field.onChange(option.map((item) => item.value));
        }}
        isMulti
        size="md"
      />
    </FormControl>
  );
};
