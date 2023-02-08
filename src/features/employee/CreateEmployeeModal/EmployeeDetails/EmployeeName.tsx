import { Grid, Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type CreateEmployeeValues } from '~/features/employee/CreateEmployeeModal/employee.schema';
import { FormControl } from '~/shared/ui/components/FormControl';

export const EmployeeName = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<CreateEmployeeValues>();
  const [t] = useTranslation();

  return (
    <Grid
      columnGap="20px"
      rowGap="10px"
      templateColumns="repeat(2, 1fr)"
    >
      <FormControl
        isRequired
        errorMessage={
          errors.first_name?.message
            ? t(
                `general_errors:${
                  errors.first_name.message as 'required_field'
                }`
              )
            : undefined
        }
        label={t('domains:employee.titles.first_name')}
      >
        <Input
          placeholder={t('general_placeholders:enter_text')}
          {...register('first_name')}
        />
      </FormControl>
      <FormControl
        isRequired
        errorMessage={
          errors.last_name?.message
            ? t(
                `general_errors:${errors.last_name.message as 'required_field'}`
              )
            : undefined
        }
        label={t('domains:employee.titles.last_name')}
      >
        <Input
          placeholder={t('general_placeholders:enter_text')}
          {...register('last_name')}
        />
      </FormControl>
    </Grid>
  );
};
