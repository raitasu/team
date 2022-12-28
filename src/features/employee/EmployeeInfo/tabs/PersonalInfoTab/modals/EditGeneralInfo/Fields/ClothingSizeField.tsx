import upperCase from 'lodash/upperCase';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeeGeneralInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/editGeneralInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { EmployeeClothingSizes } from '~/store/api/employees/employees.schemas';

export const ClothingSizeField = ({
  name
}: {
  name: 'sweat_shirt_size' | 't_shirt_size';
}) => {
  const [t] = useTranslation();

  const { field } = useController<
    Pick<EmployeeGeneralInfoFormValues, 'sweat_shirt_size' | 't_shirt_size'>
  >({
    name
  });

  const clothingSizeOptions = EmployeeClothingSizes.map((size) => ({
    value: size,
    label: size
  }));

  return (
    <FormControl
      width="315px"
      label={t(
        `domains:employee.titles.profile_tabs.personal_information.general.${name}`
      )}
    >
      <Select
        menuPlacement="top"
        options={clothingSizeOptions}
        getOptionLabel={(option) => upperCase(option.label)}
        value={clothingSizeOptions.find(
          (option) => option.value === field.value
        )}
        onChange={(option) => field.onChange(option?.value)}
      />
    </FormControl>
  );
};
