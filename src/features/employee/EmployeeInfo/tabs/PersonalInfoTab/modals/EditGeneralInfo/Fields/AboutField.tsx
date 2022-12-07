import { Textarea } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeeGeneralInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/editGeneralInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';

export const AboutField = () => {
  const [t] = useTranslation();
  const {
    register,
    formState: { errors }
  } = useFormContext<EmployeeGeneralInfoFormValues>();
  const errorMessage = errors.about?.message as 'required_field' | undefined;

  return (
    <FormControl
      label={t(
        'domains:employee.titles.profile_tabs.personal_information.general.about'
      )}
      errorMessage={
        errorMessage !== undefined
          ? t(`domains:employee.errors.${errorMessage}`)
          : ''
      }
      isRequired
    >
      <Textarea {...register('about')} />
    </FormControl>
  );
};
