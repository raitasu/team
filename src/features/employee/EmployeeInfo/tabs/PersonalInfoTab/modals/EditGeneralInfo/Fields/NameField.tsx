import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeeGeneralInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/editGeneralInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';

export const NameField = () => {
  const [t] = useTranslation();
  const {
    register,
    formState: { errors }
  } = useFormContext<EmployeeGeneralInfoFormValues>();

  return (
    <>
      <FormControl
        errorMessage={
          errors.first_name?.message
            ? t(
                `general_errors:${
                  errors.first_name.message as 'required_field'
                }`
              )
            : undefined
        }
        isRequired
        label={t('domains:employee.titles.first_name')}
      >
        <Input {...register('first_name')} />
      </FormControl>
      <FormControl
        errorMessage={
          errors.last_name?.message
            ? t(
                `general_errors:${errors.last_name.message as 'required_field'}`
              )
            : undefined
        }
        isRequired
        label={t('domains:employee.titles.last_name')}
      >
        <Input {...register('last_name')} />
      </FormControl>
    </>
  );
};
