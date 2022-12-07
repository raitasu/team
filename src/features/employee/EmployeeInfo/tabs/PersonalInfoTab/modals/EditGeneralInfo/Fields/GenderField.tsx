import { useMemo } from 'react';

import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeeGeneralInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/editGeneralInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { EmployeeGenders } from '~/store/api/employees/employees.schemas';

export const GenderField = () => {
  const { field } = useController<EmployeeGeneralInfoFormValues, 'gender'>({
    name: 'gender'
  });
  const [t] = useTranslation();

  const genderOptions = useMemo(
    () =>
      EmployeeGenders.map((gender) => ({
        value: gender,
        label: t(
          `domains:employee.titles.profile_tabs.personal_information.general.genders.${gender}`
        )
      })),
    [t]
  );

  return (
    <FormControl
      label={t(
        'domains:employee.titles.profile_tabs.personal_information.general.gender'
      )}
    >
      <Select
        options={genderOptions}
        value={genderOptions.find((option) => option.value === field.value)}
        onChange={(option) => field.onChange(option?.value)}
      />
    </FormControl>
  );
};
