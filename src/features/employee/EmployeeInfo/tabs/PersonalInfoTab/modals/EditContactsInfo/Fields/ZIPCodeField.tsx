import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TranslationKeys } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactInfo.constansts';
import { type EmployeeContactsInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.schema';
import { FormControl } from '~/shared/ui/components/FormControl';

export const ZIPCodeField = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<EmployeeContactsInfoFormValues>();

  const [t] = useTranslation();

  return (
    <FormControl
      label={t(TranslationKeys.ZIPCode)}
      errorMessage={
        errors.zip_code ? t(`general_errors:invalid_number`) : undefined
      }
    >
      <Input
        {...register('zip_code')}
        placeholder={t(
          'domains:employee.placeholders.profile_tabs.contacts.enter_zip_code'
        )}
      />
    </FormControl>
  );
};
