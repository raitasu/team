import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeeFiltersForm } from '~/features/employees/Filters/employeeFiltersForm.schema';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { EmployeeCountries } from '~/store/api/employees/employees.schemas';

export const CountryField = () => {
  const [t] = useTranslation();

  const { field } = useController<EmployeeFiltersForm, 'country'>({
    name: 'country'
  });

  const countryOptions = useMemo(
    () =>
      EmployeeCountries.map((country) => ({
        value: country,
        label: t(`enums:country.${country}`)
      })),
    [t]
  );
  const { value: currentValue } = field;

  const selectedCountry =
    currentValue !== null
      ? countryOptions.filter((country) => currentValue.includes(country.value))
      : null;

  return (
    <FormControl label={t('domains:filters.country')}>
      <Select
        onBlur={field.onBlur}
        value={selectedCountry}
        options={countryOptions}
        onChange={(option) => {
          field.onChange(
            option.length > 0 ? option.map((item) => item.value) : null
          );
        }}
        isMulti
        placeholder={t('domains:filters.placeholders.placeholder_select')}
      />
    </FormControl>
  );
};
