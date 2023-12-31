import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormControl } from '~/shared/ui/components/FormControl';

import { type EmployeeCertificateInfoFormValues } from '../EditCertificateInfo.schema';

export const TitleField = () => {
  const [t] = useTranslation();

  const {
    register,
    formState: { errors }
  } = useFormContext<EmployeeCertificateInfoFormValues>();

  const errorMessage = errors.name?.message as 'required_field' | undefined;

  return (
    <FormControl
      label={t(
        'domains:employee.titles.profile_tabs.education.title_certificates'
      )}
      errorMessage={
        errorMessage !== undefined
          ? t(`domains:employee.errors.${errorMessage}`)
          : ''
      }
      isRequired
    >
      <Input
        {...register('name')}
        placeholder={t(
          'domains:employee.placeholders.profile_tabs.education.title_certificate'
        )}
      />
    </FormControl>
  );
};
