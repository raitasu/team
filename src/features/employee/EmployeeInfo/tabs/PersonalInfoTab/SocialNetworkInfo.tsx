import { useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { isEditable } from '~/features/employee/employee.utils';
import { useGetCurrentUserQuery } from '~/store/api/authentication/authentication.api';
import {
  type EmployeeContactInfo,
  type Employee
} from '~/store/api/employees/employees.types';

import { ContactItem } from './ContactItem';
import { EditSocialNetworksInfoModal } from './modals/EditSocialNetworksInfo';
import { socialFieldsNames } from './modals/EditSocialNetworksInfo/EditSocialNetworks.constants';
import { InfoSection } from '../components/InfoSection';

export const SocialNetworkInfo = ({
  employee,
  contacts
}: {
  employee: Employee;
  contacts: EmployeeContactInfo;
}) => {
  const [t] = useTranslation();
  const {
    isOpen: isOpenSocialNetworksModal,
    onOpen: onOpenSocialNetworksModal,
    onClose: onCloseSocialNetworksModal
  } = useDisclosure();
  const { data: currentEmployee } = useGetCurrentUserQuery();

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
      {socialFieldsNames.map((network) => (
        <ContactItem
          key={network}
          name={t(`enums:social_networks.${network}`)}
          link={contacts[network] || ''}
          linkType="web"
          canCopy
        />
      ))}
      <EditSocialNetworksInfoModal
        contacts={contacts}
        isOpenModal={isOpenSocialNetworksModal}
        onCloseModal={onCloseSocialNetworksModal}
      />
    </InfoSection>
  );
};
