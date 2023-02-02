import { Textarea } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeeGeneralInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/editGeneralInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';

export const InterestsField = () => {
  const [t] = useTranslation();
  const { register } = useFormContext<EmployeeGeneralInfoFormValues>();

  return (
    <FormControl
      label={t(
        'domains:employee.titles.profile_tabs.personal_information.general.interests'
      )}
    >
      <Textarea {...register('interests')} />
    </FormControl>
  );
};
