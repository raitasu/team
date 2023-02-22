import { useEffect } from 'react';

import { Heading, VisuallyHidden } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { isAdmin } from '~/features/employee/employee.utils';
import { EmployeesTablesContainer } from '~/features/employees/Tables';
import { EmployeesContactsTable } from '~/features/employees/Tables/ContactsTable';
import { SearchEmployee } from '~/pages/About/components/SearchEmployee';
import { selectLoggedInUser } from '~/store/api/authentication/authentication.selectors';
import { resetEmployeesSlice } from '~/store/slices/employees/employees.slice';
import { useAppDispatch, useAppSelector } from '~/store/store.hooks';

export const Contacts = () => {
  const [t] = useTranslation();

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectLoggedInUser);

  useEffect(
    () => () => {
      dispatch(resetEmployeesSlice());
    },
    [dispatch]
  );

  return (
    <>
      <VisuallyHidden>
        <Heading variant="3">{t('navigation:about_sections.contacts')}</Heading>
      </VisuallyHidden>

      <EmployeesTablesContainer
        table={EmployeesContactsTable}
        hasAdminAccess={isAdmin(user)}
        header={SearchEmployee}
      />
    </>
  );
};
