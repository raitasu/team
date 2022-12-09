import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeeFilterValues } from '~/features/employees/Filters/employeesFilters.schema';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { EmployeeLanguages } from '~/store/api/employees/employees.schemas';

export const LanguageField = () => {
  const [t] = useTranslation();

  const { field } = useController<EmployeeFilterValues, 'language'>({
    name: 'language'
  });

  const languageOptions = useMemo(
    () =>
      EmployeeLanguages.map((language) => ({
        value: language,
        label: t(`enums:language.${language}`)
      })),
    [t]
  );

  const { value: currentValue } = field;

  const selectedLanguage =
    currentValue !== null
      ? languageOptions.filter((language) =>
          currentValue.includes(language.value)
        )
      : null;

  return (
    <FormControl label={t('domains:filters.language')}>
      <Select
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        value={selectedLanguage}
        options={languageOptions}
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
