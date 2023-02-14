import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormControl } from '~/shared/ui/components/FormControl';

import { type EditSocialNetworksValues } from '../EditSocialNetworks.schema';

export const SocialLinkField = ({
  linkName
}: {
  linkName: keyof EditSocialNetworksValues;
}) => {
  const [t] = useTranslation();
  const {
    register,
    formState: { errors }
  } = useFormContext<EditSocialNetworksValues>();

  return (
    <FormControl
      label={t(`enums:social_networks.${linkName}`)}
      errorMessage={
        errors[linkName] !== undefined
          ? `${t(`domains:employee.errors.invalid_link.${linkName}`)}`
          : ''
      }
    >
      <Input
        {...register(linkName)}
        type="text"
        placeholder={t('general_placeholders:enter_text')}
      />
    </FormControl>
  );
};
