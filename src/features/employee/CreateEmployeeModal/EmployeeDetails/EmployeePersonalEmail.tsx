import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type CreateEmployeeValues } from '~/features/employee/CreateEmployeeModal/employee.schema';
import { FormControl } from '~/shared/ui/components/FormControl';

export const EmployeePersonalEmail = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<CreateEmployeeValues>();
  const [t] = useTranslation();

  return (
    <FormControl
      label={t('domains:employee.titles.personal_email')}
      errorMessage={
        errors.personal_email?.message
          ? t(
              `general_errors:${
                errors.personal_email.message as 'invalid_email'
              }`
            )
          : undefined
      }
    >
      <Input
        placeholder={t('general_placeholders:enter_text')}
        type="email"
        {...register('personal_email')}
      />
    </FormControl>
  );
};
