import { Input } from '@chakra-ui/react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { type EmployeePublicationValues } from '~/features/employee/EmployeeInfo/tabs/PublicationsTab/EditPublication.schema';
import { FormControl } from '~/shared/ui/components/FormControl';

export const LinkPublicationField = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<EmployeePublicationValues>();
  const { field } = useController<EmployeePublicationValues, 'file'>({
    name: 'file'
  });
  const { field: fileURL } = useController<EmployeePublicationValues, 'url'>({
    name: 'url'
  });

  const { value: publication } = field;
  const { value: publicationURL } = fileURL;
  const { t } = useTranslation();

  const errorMessage = errors.url?.message as 'incorrect_link' | undefined;

  return (
    <FormControl
      label={t(
        'domains:employee.titles.profile_tabs.publications.link_description'
      )}
      errorMessage={
        errorMessage
          ? t(
              `domains:employee.titles.profile_tabs.publications.${errorMessage}`
            )
          : undefined
      }
      isRequired={!(publication || publicationURL)}
    >
      <Input {...register('url')} />
    </FormControl>
  );
};
