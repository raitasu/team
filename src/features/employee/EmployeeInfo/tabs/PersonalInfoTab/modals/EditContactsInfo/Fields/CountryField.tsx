import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { countryOptions } from '~/features/employee/employee.constants';
import { TranslationKeys } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactInfo.constansts';
import { type EmployeeContactsInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';

export const CountryField = () => {
  const [t] = useTranslation();
  const { field } = useController<
    EmployeeContactsInfoFormValues,
    'country_code'
  >({
    name: 'country_code'
  });

  const selectedCountry = countryOptions.find(
    (country) => country.value === field.value
  );

  return (
    <FormControl
      label={t(TranslationKeys.country)}
      isRequired
    >
      <Select
        placeholder={t('domains:filters.placeholders.placeholder_select')}
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
