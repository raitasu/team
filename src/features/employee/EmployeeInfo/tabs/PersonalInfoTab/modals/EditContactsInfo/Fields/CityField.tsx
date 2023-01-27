import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TranslationKeys } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactInfo.constansts';
import { type EmployeeContactsInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';

export const CityField = () => {
  const [t] = useTranslation();
  const { field } = useController<EmployeeContactsInfoFormValues, 'city'>({
    name: 'city'
  });

  const cities = [
    {
      en: 'moscow',
      ru: 'moscow'
    },
    { en: 'minsk', ru: 'minsk' }
  ] as const;

  const cityOptions = cities.map((city) => ({
    value: city.en,
    label: t(`enums:cities.${city.en}`)
  }));

  const selectedCity = cityOptions.find(
    (city) => city.value === field.value.en
  );

  return (
    <FormControl label={t(TranslationKeys.city)}>
      <Select
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        options={cityOptions}
        value={selectedCity}
        onChange={(option) => {
          if (option) {
            field.onChange({ en: option.value });
          }
        }}
        size="md"
      />
    </FormControl>
  );
};
