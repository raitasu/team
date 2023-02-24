import { useDisclosure } from '@chakra-ui/react';
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
        link={contacts.primary_phone || t('domains:employee.errors.no_data')}
        linkType={contacts.primary_phone ? 'phone' : undefined}
      />
      <ContactItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.contacts.mobile_secondary'
        )}
        link={contacts.secondary_phone || t('domains:employee.errors.no_data')}
        linkType={contacts.secondary_phone ? 'phone' : undefined}
      />
      <ContactItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.contacts.emergency'
        )}
        link={
          contacts.emergency_contact?.number ||
          t('domains:employee.errors.no_data')
        }
        linkType={contacts.emergency_contact?.number ? 'phone' : undefined}
      />
      <ContactItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.contacts.work_email'
        )}
        link={
          contacts.employee_attributes?.email ||
          t('domains:employee.errors.no_data')
        }
        linkType={contacts.employee_attributes?.email ? 'email' : undefined}
      />
      <ContactItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.contacts.personal_email'
        )}
        link={contacts.personal_email || t('domains:employee.errors.no_data')}
        linkType={contacts.personal_email ? 'email' : undefined}
      />
      <ContactItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.contacts.address'
        )}
        link={getAddress(contacts) || t('domains:employee.errors.no_data')}
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
