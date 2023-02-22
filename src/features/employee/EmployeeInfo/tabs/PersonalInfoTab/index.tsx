import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { type EmployeeInfoTab } from '~/features/employee/EmployeeInfo/employeeInfo.types';
import { InfoSection } from '~/features/employee/EmployeeInfo/tabs/components/InfoSection';
import { useGetContactInfoQuery } from '~/store/api/employees/contactInfo/contactInfo.api';

import { ContactInfo } from './ContactInfo';
import { GeneralInfo } from './GeneralInfo';
import { SocialNetworkInfo } from './SocialNetworkInfo';

export const PersonalInfoTab: EmployeeInfoTab = ({ employee, canEdit }) => {
  const { data: contacts, isError } = useGetContactInfoQuery(employee.id);
  const { t } = useTranslation();

  return (
    <Box>
      <GeneralInfo
        employee={employee}
        canEdit={canEdit}
      />
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
            employee={employee}
            contacts={contacts}
            canEdit={canEdit}
          />
          <SocialNetworkInfo
            contacts={contacts}
            employee={employee}
            canEdit={canEdit}
          />
        </>
      )}
    </Box>
  );
};
