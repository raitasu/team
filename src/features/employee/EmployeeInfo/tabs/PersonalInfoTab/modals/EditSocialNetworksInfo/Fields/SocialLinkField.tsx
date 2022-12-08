import { Input } from '@chakra-ui/react';
import upperFirst from 'lodash/upperFirst';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormControl } from '~/shared/ui/components/FormControl';

import { type EditSocialNetworksValues } from '../editSocialNetworks.shema';

export const SocialLinkField = ({
  linkName
}: {
  linkName: keyof EditSocialNetworksValues;
}) => {
  const [t] = useTranslation();
  const { register } = useFormContext<EditSocialNetworksValues>();

  return (
    <FormControl label={upperFirst(linkName)}>
      <Input
        {...register(linkName)}
        type="text"
        placeholder={t('general_placeholders:enter_text')}
      />
    </FormControl>
  );
};
