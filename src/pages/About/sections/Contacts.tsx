import { useEffect } from 'react';

import { Heading, VisuallyHidden } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { EmployeesTablesContainer } from '~/features/employees/Tables';
import { EmployeesContactsTable } from '~/features/employees/Tables/ContactsTable';
import { resetEmployeesSlice } from '~/store/slices/employees/employees.slice';
import { useAppDispatch } from '~/store/store.hooks';

export const Contacts = () => {
  const [t] = useTranslation();

  const dispatch = useAppDispatch();

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

      <EmployeesTablesContainer table={EmployeesContactsTable} />
    </>
  );
};
