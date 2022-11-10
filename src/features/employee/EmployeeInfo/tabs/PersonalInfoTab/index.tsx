import { Box } from '@chakra-ui/react';

import type { EmployeeInfoTab } from '~/features/employee/EmployeeInfo/employeeInfo.types';

import { ContactInfo } from './ContactInfo';
import { GeneralInfo } from './GeneralInfo';
import { SocialNetworkInfo } from './SocialNetworkInfo';

export const PersonalInfoTab: EmployeeInfoTab = ({ employee }) => (
  <Box>
    <GeneralInfo employee={employee} />
    <ContactInfo contacts={employee.contacts} />
    <SocialNetworkInfo socialNetworks={employee.social_networks} />
  </Box>
);
