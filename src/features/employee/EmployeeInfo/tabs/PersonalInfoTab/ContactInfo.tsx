import { useDisclosure } from '@chakra-ui/react';
import capitalize from 'lodash/capitalize';
import { useTranslation } from 'react-i18next';

import { isEditable } from '~/features/employee/employee.utils';
import { type ChangedContactsInfoValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfo.schemas';
import { EditContactsInfoModal } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfoModal';
import { useGetCurrentUserQuery } from '~/store/api/authentication/authentication.api';
import { useUpdateContactInfoMutation } from '~/store/api/employees/contactInfo/contactInfo.api';
import { type EmployeeContactInfo } from '~/store/api/employees/employees.types';

import { ContactItem } from './ContactItem';
import { InfoSection } from '../components/InfoSection';

export const ContactInfo = ({
  contacts,
  employeeId
}: {
  contacts: EmployeeContactInfo;
  employeeId: number;
}) => {
  const [t] = useTranslation();
  const {
    isOpen: isOpenContactsInfoTab,
    onOpen: onOpenContactsInfoTab,
    onClose: onCloseContactsInfoTab
  } = useDisclosure();
  const { data: currentUser } = useGetCurrentUserQuery();

  const [updateContactInfo] = useUpdateContactInfoMutation();

  const changeContactsInfo = (values: ChangedContactsInfoValues) => {
    if (!contacts.id) {
      return null;
    }

    return updateContactInfo({
      data: values,
      id: contacts.id
    })
      .then(onCloseContactsInfoTab)
      .catch(onCloseContactsInfoTab);
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
          String(contacts.emergency_contact?.number) ||
          t('domains:employee.errors.no_data')
        }
        linkType="phone"
      />
      <ContactItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.contacts.address'
        )}
        link={
          contacts.city
            ? capitalize(contacts.city)
            : t('domains:employee.errors.no_data')
        }
      />
      <ContactItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.contacts.email'
        )}
        link={contacts.personal_email || t('domains:employee.errors.no_data')}
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
