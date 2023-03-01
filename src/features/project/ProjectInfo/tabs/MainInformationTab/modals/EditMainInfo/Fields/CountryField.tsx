import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { countryOptions } from '~/features/employee/employee.constants';
import { type ProjectMainInfoFormValues } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/EditMainInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';

export const CountryField = () => {
  const [t] = useTranslation();
  const { field } = useController<ProjectMainInfoFormValues, 'country_id'>({
    name: 'country_id'
  });

  const countryIdOptions = countryOptions.map((item, index) => ({
    value: index + 1,
    label: t(`enums:country.${item.value}`)
  }));

  const selectedCountry = countryIdOptions.find(
    (country) => country.value === field.value
  );

  return (
    <FormControl label={t('domains:projects.region')}>
      <Select
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        options={countryIdOptions}
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
