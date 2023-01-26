import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TranslationKeys } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactInfo.constansts';
import { type EmployeeContactsInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';

export const EmergencyNameField = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<EmployeeContactsInfoFormValues>();

  const [t] = useTranslation();

  return (
    <FormControl
      label={t(TranslationKeys.emergencyName)}
      errorMessage={
        errors.emergencyContact?.name?.message
          ? t(
              `general_errors:${
                errors.emergencyContact.name.message as 'required_field'
              }`
            )
          : undefined
      }
      isRequired
    >
      <Input {...register('emergencyContact.name')} />
    </FormControl>
  );
};
