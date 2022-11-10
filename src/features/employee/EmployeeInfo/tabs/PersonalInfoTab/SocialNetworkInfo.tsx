import upperFirst from 'lodash/upperFirst';
import { useTranslation } from 'react-i18next';

import type { EmployeeSocialNetwork } from '~/shared/store/api/employees/employees.types';

import { InfoSection } from '../components/InfoSection';
import { ContactItem } from './ContactItem';

export const SocialNetworkInfo = ({
  socialNetworks
}: {
  socialNetworks: EmployeeSocialNetwork;
}) => {
  const [t] = useTranslation();

  return (
    <InfoSection
      title={t(
        'titles:employee.tabs.personal_information.social_network_title'
      )}
    >
      {Object.entries(socialNetworks).map((network) => (
        <ContactItem
          name={upperFirst(network[0])}
          values={network[1]}
          linkType="web"
        />
      ))}
    </InfoSection>
  );
};
