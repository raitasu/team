import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { timezoneOptions } from '~/features/employee/employee.constants';
import { TranslationKeys } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactInfo.constansts';
import { type EmployeeContactsInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';

export const TimeZoneField = () => {
  const [t] = useTranslation();
  const { field } = useController<EmployeeContactsInfoFormValues, 'time_zone'>({
    name: 'time_zone'
  });

  const selectedZone = timezoneOptions.find(
    (zone) => zone.value === field.value
  );

  return (
    <FormControl label={t(TranslationKeys.timezone)}>
      <Select
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        options={timezoneOptions}
        value={selectedZone || null}
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
