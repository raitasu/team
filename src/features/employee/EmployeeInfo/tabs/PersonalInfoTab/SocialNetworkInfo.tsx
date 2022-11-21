import upperFirst from 'lodash/upperFirst';
import { useTranslation } from 'react-i18next';

import { type EmployeeSocialNetwork } from '~/shared/store/api/employees/employees.types';

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
      isEditable={false}
    >
      {(
        Object.entries(socialNetworks) as [
          key: keyof EmployeeSocialNetwork,
          value: EmployeeSocialNetwork[keyof EmployeeSocialNetwork]
        ][]
      ).map((network) => (
        <ContactItem
          key={network[0]}
          name={upperFirst(network[0])}
          values={[network[1]]}
          linkType="web"
        />
      ))}
    </InfoSection>
  );
};
