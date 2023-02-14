import { Box } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { type EmployeeInfoTab } from '~/features/employee/EmployeeInfo/employeeInfo.types';
import { InfoSection } from '~/features/employee/EmployeeInfo/tabs/components/InfoSection';
import { useGetContactInfoQuery } from '~/store/api/employees/contactInfo/contactInfo.api';

import { ContactInfo } from './ContactInfo';
import { GeneralInfo } from './GeneralInfo';
import { SocialNetworkInfo } from './SocialNetworkInfo';

export const PersonalInfoTab: EmployeeInfoTab = ({ employee }) => {
  const { id } = useParams();

  const { data: contacts, isError } = useGetContactInfoQuery(
    id ? +id : skipToken
  );
  const { t } = useTranslation();

  return (
    <Box>
      <GeneralInfo employee={employee} />
      {isError || !contacts || !contacts.id ? (
        <InfoSection
          title={t(
            'domains:employee.titles.profile_tabs.personal_information.contacts.section_title'
          )}
        >
          <div>Oops, something went wrong :(</div>
        </InfoSection>
      ) : (
        <>
          <ContactInfo
            contacts={contacts}
            employeeId={contacts.id}
          />
          <SocialNetworkInfo
            employee={employee}
            contacts={contacts}
          />
        </>
      )}
    </Box>
  );
};
