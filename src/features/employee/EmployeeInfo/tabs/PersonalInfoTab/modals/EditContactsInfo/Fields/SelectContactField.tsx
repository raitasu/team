import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type TranslationKeys } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactInfo.constansts';
import { type EmployeeContactsInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.schemas';
import { getTranslation } from '~/services/i18n/i18n.utils';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';
import { type Translation } from '~/store/api/api.types';

export const SelectContactField = ({
  name,
  label,
  placeholder,
  data
}: {
  name: keyof EmployeeContactsInfoFormValues;
  label: (typeof TranslationKeys)[keyof EmployeeContactsInfoFormValues];
  placeholder?: string;
  data: Translation;
}) => {
  const [t, { language }] = useTranslation();
  const { field } = useController<EmployeeContactsInfoFormValues, typeof name>({
    name
  });

  const options = [{ value: data.en, label: getTranslation(data, language) }];
  const { value: currentValue } = field;

  return (
    <FormControl label={t(label)}>
      <Select
        value={options.find((item) => item.value === currentValue)}
        options={options}
        onChange={(option) => {
          field.onChange(option !== null ? option.value : undefined);
        }}
        placeholder={placeholder}
      />
    </FormControl>
  );
};
