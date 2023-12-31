import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TranslationKeys } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactInfo.constansts';
import { type EmployeeContactsInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.schema';
import { FormControl } from '~/shared/ui/components/FormControl';

export const EmergencyContactField = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<EmployeeContactsInfoFormValues>();

  const [t] = useTranslation();

  return (
    <FormControl
      label={t(TranslationKeys.emergencyContact)}
      errorMessage={
        errors.emergency_contact_attributes?.number?.message
          ? t(
              `general_errors:${
                errors.emergency_contact_attributes.number
                  .message as 'required_field'
              }`
            )
          : undefined
      }
      isRequired
    >
      <Input
        {...register('emergency_contact_attributes.number')}
        placeholder={t('general_placeholders:enter_number')}
      />
    </FormControl>
  );
};
