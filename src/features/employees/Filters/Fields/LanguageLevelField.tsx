import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeeFiltersForm } from '~/features/employees/Filters/employeeFiltersForm.schema';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { EmployeeLanguageLevel } from '~/store/api/employees/employees.schemas';

export const LanguageLevelField = ({ index }: { index: number }) => {
  const [t] = useTranslation();

  const { field } = useController<EmployeeFiltersForm, `languages.${number}`>({
    name: `languages.${index}`
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
    currentValue.level !== null
      ? languageLevelOptions.find(
          (languageLevel) => languageLevel.value === currentValue.level
        )
      : null;

  return (
    <FormControl label={t('domains:filters.language_level')}>
      <Select
        {...field}
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        value={selectedLanguageLevel}
        options={languageLevelOptions}
        onChange={(option) => {
          field.onChange({
            name: field.value.name,
            level: option ? option.value : null
          });
        }}
        size="md"
      />
    </FormControl>
  );
};
