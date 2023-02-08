import { Input } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TranslationKeys } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactInfo.constansts';
import { type EmployeeContactsInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';

export const BuildingFiled = () => {
  const { field } = useController<EmployeeContactsInfoFormValues, 'building'>({
    name: 'building'
  });

  const [t] = useTranslation();

  return (
    <FormControl label={t(TranslationKeys.building)}>
      <Input
        value={field.value}
        onChange={(event) => {
          if (/^[\d.,:]*$/.test(event.currentTarget.value))
            field.onChange(Number(event.currentTarget.value));
        }}
      />
    </FormControl>
  );
};
