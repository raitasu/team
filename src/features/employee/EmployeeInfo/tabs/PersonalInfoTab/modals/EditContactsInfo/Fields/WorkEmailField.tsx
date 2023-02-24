import { Flex, Input, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TranslationKeys } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactInfo.constansts';
import { type EmployeeContactsInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.schema';
import { FormControl } from '~/shared/ui/components/FormControl';

export const WorkEmailField = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<EmployeeContactsInfoFormValues>();

  const [t] = useTranslation();

  return (
    <FormControl
      label={t(TranslationKeys.workEmail)}
      errorMessage={
        errors.employee_attributes?.email?.message
          ? t(
              `general_errors:${
                errors.employee_attributes.email.message as 'invalid_email'
              }`
            )
          : undefined
      }
      isRequired
    >
      <Flex>
        <Input
          {...register('employee_attributes.email')}
          placeholder={t('general_placeholders:enter_email')}
        />
        <Text padding="10px">@cybergizer.com</Text>
      </Flex>
    </FormControl>
  );
};
