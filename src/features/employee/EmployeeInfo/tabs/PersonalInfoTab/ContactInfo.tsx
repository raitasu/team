import { useDisclosure } from '@chakra-ui/react';
import capitalize from 'lodash/capitalize';
import { useTranslation } from 'react-i18next';

import { isEditable } from '~/features/employee/employee.utils';
import { type ChangedContactsInfoValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.schemas';
import { EditContactsInfoModal } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfoModal';
import { getTranslation } from '~/services/i18n/i18n.utils';
import { useGetCurrentUserQuery } from '~/store/api/authentication/authentication.api';
import { type EmployeeContact } from '~/store/api/employees/employees.types';

import { ContactItem } from './ContactItem';
import { InfoSection } from '../components/InfoSection';

export const ContactInfo = ({
  contacts,
  employeeId
}: {
  contacts: EmployeeContact;
  employeeId: number;
}) => {
  const [t, { language }] = useTranslation();
  const {
    isOpen: isOpenContactsInfoTab,
    onOpen: onOpenContactsInfoTab,
    onClose: onCloseContactsInfoTab
  } = useDisclosure();
  const { data: currentUser } = useGetCurrentUserQuery();
  const changeContactsInfo = (values: ChangedContactsInfoValues) => {
    console.debug(values);
  };

  return (
    <InfoSection
      title={t(
        'domains:employee.titles.profile_tabs.personal_information.contacts.section_title'
      )}
      onEdit={
        isEditable(employeeId, currentUser) ? onOpenContactsInfoTab : undefined
      }
    >
      <ContactItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.contacts.mobile_primary'
        )}
        link={contacts.primary_phone || t('domains:employee.errors.no_data')}
        linkType="phone"
      />
      <ContactItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.contacts.mobile_secondary'
        )}
        link={contacts.secondary_phone || t('domains:employee.errors.no_data')}
        linkType="phone"
      />
      <ContactItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.contacts.emergency'
        )}
        link={
          contacts.emergency_contact.phone ||
          t('domains:employee.errors.no_data')
        }
        linkType="phone"
      />
      <ContactItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.contacts.address'
        )}
        link={
          contacts.address?.city
            ? capitalize(getTranslation(contacts.address.city, language))
            : t('domains:employee.errors.no_data')
        }
      />
      <ContactItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.contacts.email'
        )}
        link={contacts.personal_email}
        linkType="email"
      />
      <EditContactsInfoModal
        contacts={contacts}
        isOpenGeneralInfoTab={isOpenContactsInfoTab}
        onCloseGeneralInfoTab={onCloseContactsInfoTab}
        onConfirm={changeContactsInfo}
      />
    </InfoSection>
  );
};
