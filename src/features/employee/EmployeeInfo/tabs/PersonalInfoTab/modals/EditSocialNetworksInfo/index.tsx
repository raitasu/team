import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import upperCase from 'lodash/upperCase';
import { useForm, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { type SocialNetwork } from '~/store/api/employees/employees.types';

import { socialFieldsNames } from './editSocialNetworks.constants';
import {
  type EditSocialNetworksValues,
  EditSocialNetworksSchema
} from './editSocialNetworks.shema';
import { SocialLinkField } from './Fields/SocialLinkField';

export const EditSocialNetworksInfoModal = ({
  networks,
  isOpenModal,
  onCloseModal
}: {
  networks: SocialNetwork;
  isOpenModal: boolean;
  onCloseModal: () => void;
}) => {
  const [t] = useTranslation();

  const methods = useForm<EditSocialNetworksValues>({
    defaultValues: {
      linkedin: networks.linkedin,
      github: networks.github,
      discord: networks.discord,
      telegram: networks.telegram,
      facebook: networks.facebook,
      instagram: networks.instagram,
      vk: networks.vk
    },
    mode: 'onBlur',
    resolver: zodResolver(EditSocialNetworksSchema)
  });

  const closeForm = () => {
    methods.reset();
    onCloseModal();
  };

  const onConfirm = () => {
    methods
      .handleSubmit((data: EditSocialNetworksValues) => console.debug(data))()
      .catch(() => undefined);

    onCloseModal();
  };

  return (
    <BaseModal
      autoFocus={false}
      title={upperCase(
        t(
          'domains:employee.titles.profile_tabs.personal_information.social_network_title'
        )
      )}
      isOpen={isOpenModal}
      onClose={closeForm}
      shouldUseOverlay
      isCentered
      contentProps={{
        maxWidth: '688px'
      }}
      footer={
        <ActionsModalFooter
          onCancel={closeForm}
          onReset={() => methods.reset()}
          onSubmit={onConfirm}
          isValid={methods.formState.isValid}
          isTouched={methods.formState.isDirty}
        />
      }
    >
      <Flex
        flexDirection="column"
        gap="20px"
      >
        <FormProvider {...methods}>
          {Object.values(socialFieldsNames).map((link) => (
            <SocialLinkField
              key={link}
              linkName={link}
            />
          ))}
        </FormProvider>
      </Flex>
    </BaseModal>
  );
};
