import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeeEducationInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/EditEducationInfo.schema';
import { FormControl } from '~/shared/ui/components/FormControl';

export const StudyField = () => {
  const [t] = useTranslation();

  const {
    register,
    formState: { errors }
  } = useFormContext<EmployeeEducationInfoFormValues>();

  const errorMessage = errors.field_of_study?.en?.message as
    | 'required_field'
    | undefined;

  return (
    <FormControl
      label={t(
        'domains:employee.titles.profile_tabs.education.fields_of_study'
      )}
      errorMessage={
        errorMessage !== undefined
          ? t(`domains:employee.errors.${errorMessage}`)
          : ''
      }
      isRequired
    >
      <Input {...register('field_of_study.en')} />
    </FormControl>
  );
};
