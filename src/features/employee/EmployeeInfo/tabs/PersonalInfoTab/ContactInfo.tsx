import { useTranslation } from 'react-i18next';

import { getTranslation } from '~/services/i18n/i18n.utils';
import { type EmployeeContact } from '~/shared/store/api/employees/employees.types';

import { InfoSection } from '../components/InfoSection';
import { ContactItem } from './ContactItem';

export const ContactInfo = ({ contacts }: { contacts: EmployeeContact }) => {
  const [t, { language }] = useTranslation();

  return (
    <InfoSection
      title={t(
        'titles:employee.tabs.personal_information.contacts.section_title'
      )}
    >
      <ContactItem
        name={t(
          'titles:employee.tabs.personal_information.contacts.mobile_primary'
        )}
        values={[contacts.primary_phone]}
        linkType="phone"
      />
      <ContactItem
        name={t(
          'titles:employee.tabs.personal_information.contacts.mobile_secondary'
        )}
        values={contacts.phones}
        linkType="phone"
      />
      <ContactItem
        name={t('titles:employee.tabs.personal_information.contacts.emergency')}
        values={contacts.emergency_phones}
        linkType="phone"
      />
      <ContactItem
        name={t('titles:employee.tabs.personal_information.contacts.address')}
        values={[getTranslation(contacts.address.city, language)]}
      />
      <ContactItem
        name={t('titles:employee.tabs.personal_information.contacts.email')}
        values={contacts.emails}
        linkType="email"
      />
    </InfoSection>
  );
};
