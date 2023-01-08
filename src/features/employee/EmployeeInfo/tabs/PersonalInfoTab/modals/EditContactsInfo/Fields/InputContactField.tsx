import { Input } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type TranslationKeys } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactInfo.constansts';
import { type EmployeeContactsInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';

export const InputContactField = ({
  name,
  label,
  placeholder,
  isRequired,
  errorMessage
}: {
  name: keyof EmployeeContactsInfoFormValues;
  label: (typeof TranslationKeys)[keyof EmployeeContactsInfoFormValues];
  placeholder?: string;
  isRequired?: boolean;
  errorMessage?: string;
}) => {
  const [t] = useTranslation();
  const { field } = useController<EmployeeContactsInfoFormValues, typeof name>({
    name
  });

  return (
    <FormControl
      label={t(label)}
      isRequired={isRequired}
      errorMessage={errorMessage}
    >
      <Input
        value={field.value}
        onChange={field.onChange}
        placeholder={placeholder}
      />
    </FormControl>
  );
};
