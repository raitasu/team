import { useDisclosure } from '@chakra-ui/react';
import upperFirst from 'lodash/upperFirst';
import { useTranslation } from 'react-i18next';

import { isEditable } from '~/features/employee/employee.utils';
import { useGetCurrentUserQuery } from '~/store/api/authentication/authentication.api';
import {
  type Employee,
  type SocialNetwork
} from '~/store/api/employees/employees.types';

import { ContactItem } from './ContactItem';
import { EditSocialNetworksInfoModal } from './modals/EditSocialNetworksInfo';
import { InfoSection } from '../components/InfoSection';

export const SocialNetworkInfo = ({ employee }: { employee: Employee }) => {
  const [t] = useTranslation();
  const {
    isOpen: isOpenSocialNetworksModal,
    onOpen: onOpenSocialNetworksModal,
    onClose: onCloseSocialNetworksModal
  } = useDisclosure();
  const { data: currentEmployee } = useGetCurrentUserQuery();

  const socialNetworks = employee.social_networks
    ? employee.social_networks
    : {};

  return (
    <InfoSection
      title={t(
        'domains:employee.titles.profile_tabs.personal_information.social_network_title'
      )}
      onEdit={
        isEditable(employee.id, currentEmployee)
          ? onOpenSocialNetworksModal
          : undefined
      }
    >
      {(
        Object.entries(socialNetworks) as [
          key: keyof SocialNetwork,
          value: SocialNetwork[keyof SocialNetwork]
        ][]
      ).map((network) => {
        const [name, link] = network;

        if (!link) {
          return null;
        }

        return (
          <ContactItem
            key={name}
            name={upperFirst(name)}
            values={[link]}
            linkType="web"
          />
        );
      })}

      <EditSocialNetworksInfoModal
        networks={socialNetworks}
        isOpenModal={isOpenSocialNetworksModal}
        onCloseModal={onCloseSocialNetworksModal}
      />
    </InfoSection>
  );
};
