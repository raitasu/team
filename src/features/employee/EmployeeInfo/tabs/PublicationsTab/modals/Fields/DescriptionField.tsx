import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeePublicationValues } from '~/features/employee/EmployeeInfo/tabs/PublicationsTab/EditPublication.schema';
import { FormControl } from '~/shared/ui/components/FormControl';

export const DescriptionField = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<EmployeePublicationValues>();

  const { t } = useTranslation();

  const errorMessage = errors.description?.message as
    | 'required_field'
    | undefined;

  return (
    <FormControl
      label={t('domains:employee.titles.profile_tabs.publications.description')}
      errorMessage={
        errorMessage ? t(`domains:employee.errors.${errorMessage}`) : undefined
      }
      isRequired
    >
      <Input {...register('description')} />
    </FormControl>
  );
};
