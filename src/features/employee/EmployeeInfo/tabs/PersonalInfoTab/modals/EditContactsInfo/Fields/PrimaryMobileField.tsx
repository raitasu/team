import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TranslationKeys } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactInfo.constansts';
import { type EmployeeContactsInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';

export const PrimaryMobileField = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<EmployeeContactsInfoFormValues>();

  const [t] = useTranslation();

  return (
    <FormControl
      label={t(TranslationKeys.primaryPhone)}
      errorMessage={
        errors.primary_phone?.message
          ? t(
              `general_errors:${
                errors.primary_phone.message as 'required_field'
              }`
            )
          : undefined
      }
      isRequired
    >
      <Input
        {...register('primary_phone')}
        placeholder={t('general_placeholders:enter_number')}
      />
    </FormControl>
  );
};
