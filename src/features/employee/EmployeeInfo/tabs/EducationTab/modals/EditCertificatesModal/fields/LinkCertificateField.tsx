import { Input } from '@chakra-ui/react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormControl } from '~/shared/ui/components/FormControl';

import { type EmployeeCertificateInfoFormValues } from '../EditCertificateInfo.schema';

export const LinkCertificateField = () => {
  const [t] = useTranslation();

  const {
    register,
    formState: { errors },
    trigger
  } = useFormContext<EmployeeCertificateInfoFormValues>();

  const { field } = useController<EmployeeCertificateInfoFormValues, 'file'>({
    name: 'file'
  });
  const { field: fileURL } = useController<
    EmployeeCertificateInfoFormValues,
    'link'
  >({
    name: 'link'
  });

  const { value: certificate } = field;
  const { value: certificateURL } = fileURL;

  const errorMessage = errors.link?.message as 'incorrect_link' | undefined;

  return (
    <FormControl
      label={t(
        'domains:employee.titles.profile_tabs.education.link_description'
      )}
      errorMessage={
        errorMessage ? t(`domains:employee.errors.${errorMessage}`) : undefined
      }
      isRequired={!(certificate || certificateURL)}
    >
      <Input
        {...register('link')}
        placeholder={t('general_placeholders:enter_link')}
        onBlur={() => trigger()}
      />
    </FormControl>
  );
};
