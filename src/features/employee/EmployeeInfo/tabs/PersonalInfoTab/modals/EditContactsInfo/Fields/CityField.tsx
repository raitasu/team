import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { citiesOptions } from '~/features/employee/employee.constants';
import { TranslationKeys } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactInfo.constansts';
import { type EmployeeContactsInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';

export const CityField = () => {
  const [t] = useTranslation();
  const { field } = useController<EmployeeContactsInfoFormValues, 'city'>({
    name: 'city'
  });

  const selectedCity = citiesOptions.find((city) => city.value === field.value);

  return (
    <FormControl label={t(TranslationKeys.city)}>
      <Select
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        options={citiesOptions}
        value={selectedCity}
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
