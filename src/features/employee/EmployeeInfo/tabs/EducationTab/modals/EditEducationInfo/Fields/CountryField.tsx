import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeeEducationInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/EditEducationInfo.schema';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { EmployeeCountries } from '~/store/api/employees/employees.schemas';

export const CountryField = () => {
  const { field } = useController<EmployeeEducationInfoFormValues, 'country'>({
    name: 'country'
  });
  const [t] = useTranslation();

  const countryOptions = useMemo(
    () =>
      EmployeeCountries.map((country) => ({
        value: country,
        label: t(`enums:country.${country}`)
      })),
    [t]
  );

  const selectedCountry = countryOptions.find(
    (country) => country.value === field.value
  );

  return (
    <FormControl
      label={t('domains:employee.titles.profile_tabs.education.country')}
      isRequired
    >
      <Select
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        options={countryOptions}
        value={selectedCountry}
        onChange={(option) => {
          field.onChange(option.map((item) => item.value));
        }}
        isMulti
        size="md"
      />
    </FormControl>
  );
};
