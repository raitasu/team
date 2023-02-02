import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TranslationKeys } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactInfo.constansts';
import { type EmployeeContactsInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { EmployeeTimezones } from '~/store/api/employees/employees.schemas';

export const TimeZoneField = () => {
  const [t] = useTranslation();
  const { field } = useController<EmployeeContactsInfoFormValues, 'timezone'>({
    name: 'timezone'
  });
  const timezoneOptions = useMemo(
    () =>
      EmployeeTimezones.map((timezone) => ({
        value: timezone,
        label: timezone
      })),
    []
  );

  return (
    <FormControl label={t(TranslationKeys.timezone)}>
      <Select
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        options={timezoneOptions}
        value={{ value: field.value, label: field.value }}
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
