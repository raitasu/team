import upperFirst from 'lodash/upperFirst';
import { useTranslation } from 'react-i18next';

import { type SocialNetwork } from '~/store/api/employees/employees.types';

import { InfoSection } from '../components/InfoSection';
import { ContactItem } from './ContactItem';

export const SocialNetworkInfo = ({
  socialNetworks
}: {
  socialNetworks: SocialNetwork;
}) => {
  const [t] = useTranslation();

  return (
    <InfoSection
      title={t(
        'domains:employee.titles.profile_tabs.personal_information.social_network_title'
      )}
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
    </InfoSection>
  );
};
