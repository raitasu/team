import { Input } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeeEducationInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/EditEducationInfo.schema';
import { getTranslation } from '~/services/i18n/i18n.utils';
import { FormControl } from '~/shared/ui/components/FormControl';

export const UniversityNameField = () => {
  const { field } = useController<
    EmployeeEducationInfoFormValues,
    'university_name'
  >({
    name: 'university_name'
  });
  const [t, { language }] = useTranslation();

  return (
    <FormControl
      label={t(
        'domains:employee.titles.profile_tabs.education.university_name'
      )}
      isRequired
    >
      <Input
        value={getTranslation(field.value, language)}
        onChange={field.onChange}
      />
    </FormControl>
  );
};
