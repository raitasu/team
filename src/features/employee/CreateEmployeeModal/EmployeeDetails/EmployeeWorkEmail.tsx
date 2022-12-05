import { Flex, Input, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type CreateEmployeeValues } from '~/features/employee/CreateEmployeeModal/employee.schema';
import { FormControl } from '~/shared/ui/components/FormControl';

export const EmployeeWorkEmail = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<CreateEmployeeValues>();
  const [t] = useTranslation();

  return (
    <FormControl
      isRequired
      errorMessage={
        errors.email?.message
          ? t(`general_errors:${errors.email.message as 'invalid_email'}`)
          : undefined
      }
      label={t('domains:employee.titles.work_email')}
    >
      <Flex alignItems="center">
        <Input
          placeholder={t('general_placeholders:enter_text')}
          type="email"
          {...register('email')}
        />
        <Text padding="10px">@cybergizer.com</Text>
      </Flex>
    </FormControl>
  );
};
