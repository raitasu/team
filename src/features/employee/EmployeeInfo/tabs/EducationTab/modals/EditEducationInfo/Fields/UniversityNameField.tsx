import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeeEducationInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/EditEducationInfo.schema';
import { FormControl } from '~/shared/ui/components/FormControl';

export const UniversityNameField = () => {
  const [t] = useTranslation();

  const {
    register,
    formState: { errors }
  } = useFormContext<EmployeeEducationInfoFormValues>();

  const errorMessage = errors.university_name?.en?.message as
    | 'required_field'
    | undefined;

  return (
    <FormControl
      label={t(
        'domains:employee.titles.profile_tabs.education.university_name'
      )}
      errorMessage={
        errorMessage !== undefined
          ? t(`domains:employee.errors.${errorMessage}`)
          : ''
      }
      isRequired
    >
      <Input {...register('university_name.en')} />
    </FormControl>
  );
};
