import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeeFiltersForm } from '~/features/employees/Filters/employeeFiltersForm.schema';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { EmployeeLanguages } from '~/store/api/employees/employees.schemas';

export const LanguageField = ({ index }: { index: number }) => {
  const [t] = useTranslation();

  const {
    field,
    formState: { errors }
  } = useController<EmployeeFiltersForm, `languages.${number}`>({
    name: `languages.${index}`
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

  const selectedLanguage = currentValue.name
    ? languageOptions.filter((language) => language.value === currentValue.name)
    : null;

  return (
    <FormControl
      label={t('domains:filters.language')}
      errorMessage={
        errors.languages?.[index]?.level?.message
          ? t(
              `general_errors:${
                errors.languages[index]?.level?.message as 'required_field'
              }`
            )
          : undefined
      }
    >
      <Select
        {...field}
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        value={selectedLanguage}
        options={languageOptions}
        onChange={(option) => {
          field.onChange({
            name: option?.value || null,
            level: field.value.level
          });
        }}
        size="md"
      />
    </FormControl>
  );
};
