import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { countryOptions } from '~/features/employee/employee.constants';
import { type EmployeeEducationInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EducationInfo/EducationInfo.schema';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';

export const CountryField = () => {
  const { field } = useController<EmployeeEducationInfoFormValues, 'country'>({
    name: 'country'
  });
  const [t] = useTranslation();

  const selectedCountry =
    countryOptions.find((country) => country.value === field.value) ?? null;

  return (
    <FormControl
      label={t('domains:employee.titles.profile_tabs.education.country')}
    >
      <Select
        placeholder={t('general_placeholders:select')}
        options={countryOptions}
        value={selectedCountry}
        onChange={(option) => {
          if (option) {
            field.onChange(option.value);
          }
        }}
        size="md"
      />
    </FormControl>
  );
};
