import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TranslationKeys } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactInfo.constansts';
import { type EmployeeContactsInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.schema';
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
        errors.emergency_contact_attributes?.name?.message
          ? t(
              `general_errors:${
                errors.emergency_contact_attributes.name
                  .message as 'required_field'
              }`
            )
          : undefined
      }
      isRequired
    >
      <Input
        {...register('emergency_contact_attributes.name')}
        placeholder={t(
          'domains:employee.placeholders.profile_tabs.contacts.enter_name'
        )}
      />
    </FormControl>
  );
};
