import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TranslationKeys } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactInfo.constansts';
import { type EmployeeContactsInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';

export const EmergencyWhoIsThisField = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<EmployeeContactsInfoFormValues>();

  const [t] = useTranslation();

  return (
    <FormControl
      label={t(TranslationKeys.emergencyWhoIsThis)}
      errorMessage={
        errors.emergencyContact?.who_is_this?.message
          ? t(
              `general_errors:${
                errors.emergencyContact.who_is_this.message as 'required_field'
              }`
            )
          : undefined
      }
      isRequired
    >
      <Input {...register('emergencyContact.who_is_this')} />
    </FormControl>
  );
};
