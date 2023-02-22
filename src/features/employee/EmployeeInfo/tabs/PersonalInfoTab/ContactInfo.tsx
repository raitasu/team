import { Text, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { EditContactsInfoModal } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditContactsInfo/EditContactsInfoModal';
import {
  type Employee,
  type EmployeeContactInfo
} from '~/store/api/employees/employees.types';

import { ContactItem } from './ContactItem';
import { getAddress } from './modals/EditContactsInfo/EditContactsInfo.utils';
import { InfoSection } from '../components/InfoSection';

export const ContactInfo = ({
  contacts,
  employee,
  canEdit
}: {
  canEdit: boolean;
  employee: Employee;
  contacts: EmployeeContactInfo;
}) => {
  const [t] = useTranslation();

  const {
    isOpen: isOpenContactsInfoTab,
    onOpen: onOpenContactsInfoTab,
    onClose: onCloseContactsInfoTab
  } = useDisclosure();

  return (
    <InfoSection
      title={t(
        'domains:employee.titles.profile_tabs.personal_information.contacts.section_title'
      )}
      onEdit={canEdit ? onOpenContactsInfoTab : undefined}
    >
      <ContactItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.contacts.mobile_primary'
        )}
        link={contacts.primary_phone || ''}
        linkType="phone"
      />
      <ContactItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.contacts.mobile_secondary'
        )}
        link={contacts.secondary_phone || ''}
        linkType="phone"
      />
      <ContactItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.contacts.emergency'
        )}
        link={String(contacts.emergency_contact?.number) || ''}
        linkType="phone"
      >
        <Text color="brand.lightGray">
          {` (${
            contacts.emergency_contact?.name
              ? contacts.emergency_contact.name
              : t(
                  'domains:employee.titles.profile_tabs.personal_information.contacts.emergency_contact'
                )
          }, ${
            contacts.emergency_contact?.owner
              ? contacts.emergency_contact.owner
              : t(
                  'domains:employee.titles.profile_tabs.personal_information.contacts.owner'
                )
          })`}
        </Text>
      </ContactItem>
      <ContactItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.contacts.work_email'
        )}
        link={contacts.employee_attributes?.email || ''}
        linkType="email"
      />
      <ContactItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.contacts.personal_email'
        )}
        link={contacts.personal_email || ''}
        linkType="email"
      />
      <ContactItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.contacts.address'
        )}
        link={getAddress(contacts)}
      />
      <EditContactsInfoModal
        contacts={contacts}
        employee={employee}
        isOpenGeneralInfoTab={isOpenContactsInfoTab}
        onCloseGeneralInfoTab={onCloseContactsInfoTab}
      />
    </InfoSection>
  );
};
