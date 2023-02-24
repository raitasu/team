import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TranslationKeys } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactInfo.constansts';
import { type EmployeeContactsInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.schema';
import { FormControl } from '~/shared/ui/components/FormControl';

export const PersonalEmailField = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<EmployeeContactsInfoFormValues>();

  const [t] = useTranslation();

  return (
    <FormControl
      label={t(TranslationKeys.personalEmail)}
      errorMessage={
        errors.personal_email ? t(`general_errors:invalid_email`) : undefined
      }
    >
      <Input
        {...register('personal_email')}
        placeholder={t('general_placeholders:enter_email')}
      />
    </FormControl>
  );
};
