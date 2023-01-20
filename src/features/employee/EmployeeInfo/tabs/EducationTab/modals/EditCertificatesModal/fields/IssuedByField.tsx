import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormControl } from '~/shared/ui/components/FormControl';

import { type EmployeeCertificateInfoFormValues } from '../EditCertificateInfo.schema';

export const IssuedByField = () => {
  const [t] = useTranslation();

  const {
    register,
    formState: { errors }
  } = useFormContext<EmployeeCertificateInfoFormValues>();

  const errorMessage = errors.issued_by?.message as
    | 'required_field'
    | undefined;

  return (
    <FormControl
      label={t('domains:employee.titles.profile_tabs.education.issued_by')}
      errorMessage={
        errorMessage !== undefined
          ? t(`domains:employee.errors.${errorMessage}`)
          : ''
      }
      isRequired
    >
      <Input
        {...register('issued_by')}
        placeholder={t(
          'domains:employee.placeholders.profile_tabs.education.issued_by'
        )}
      />
    </FormControl>
  );
};
