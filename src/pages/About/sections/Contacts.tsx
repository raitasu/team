import { Heading, VisuallyHidden } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { EmployeesTablesContainer } from '~/features/employees/Tables';
import { EmployeesContactsTable } from '~/features/employees/Tables/ContactsTable';

export const Contacts = () => {
  const [t] = useTranslation();

  return (
    <>
      <VisuallyHidden>
        <Heading variant="3">{t('navigation:about_sections.contacts')}</Heading>
      </VisuallyHidden>

      <EmployeesTablesContainer table={EmployeesContactsTable} />
    </>
  );
};
