import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeeGeneralInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/editGeneralInfo.schemas';
import { DatePicker } from '~/shared/ui/components/DatePicker';
import { FormControl } from '~/shared/ui/components/FormControl';

export const BirthDateField = () => {
  const [t] = useTranslation();
  const { field } = useController<EmployeeGeneralInfoFormValues, 'dateOfBirth'>(
    {
      name: 'dateOfBirth'
    }
  );

  return (
    <FormControl
      label={t(
        'domains:employee.titles.profile_tabs.personal_information.general.date_of_birth'
      )}
    >
      <DatePicker
        selected={new Date(field.value)}
        onChange={(e) => field.onChange(e?.toISOString())}
      />
    </FormControl>
  );
};
