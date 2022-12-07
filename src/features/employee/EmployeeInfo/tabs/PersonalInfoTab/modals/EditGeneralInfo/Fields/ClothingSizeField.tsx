import upperCase from 'lodash/upperCase';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeeGeneralInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/editGeneralInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { EmployeeClothingSizes } from '~/store/api/employees/employees.schemas';

export const ClothingSizeField = () => {
  const [t] = useTranslation();

  const { field } = useController<
    EmployeeGeneralInfoFormValues,
    'clothingSize'
  >({
    name: 'clothingSize'
  });

  const clothingSizeOptions = EmployeeClothingSizes.map((size) => ({
    value: size,
    label: size
  }));

  return (
    <FormControl
      label={t(
        'domains:employee.titles.profile_tabs.personal_information.general.clothing_size'
      )}
    >
      <Select
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
