import { Input } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeeEducationInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/EducationTab/modals/EditEducationInfo/EditEducationInfo.schema';
import { getTranslation } from '~/services/i18n/i18n.utils';
import { FormControl } from '~/shared/ui/components/FormControl';

export const StudyField = () => {
  const { field } = useController<
    EmployeeEducationInfoFormValues,
    'field_of_study'
  >({
    name: 'field_of_study'
  });
  const [t, { language }] = useTranslation();

  return (
    <FormControl
      label={t(
        'domains:employee.titles.profile_tabs.education.fields_of_study'
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
