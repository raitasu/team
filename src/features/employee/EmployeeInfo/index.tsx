import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { EducationTab } from '~/features/employee/EmployeeInfo/tabs/EducationTab';
import { PersonalInfoTab } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab';
import { PublicationTab } from '~/features/employee/EmployeeInfo/tabs/PublicationTab';
import { WorkExperienceTab } from '~/features/employee/EmployeeInfo/tabs/WorkExperienceTab';
import type { Employee } from '~/shared/store/api/employees/employees.types';

import { SkillsTab } from './tabs/skills';

const employeeInfoTabs = [
  {
    title: 'personal_information' as const,
    panel: PersonalInfoTab
  },
  {
    title: 'work_experience' as const,
    panel: WorkExperienceTab
  },
  {
    title: 'skills' as const,
    panel: SkillsTab
  },
  {
    title: 'education' as const,
    panel: EducationTab
  },
  {
    title: 'publication' as const,
    panel: PublicationTab
  }
];

export const EmployeeInfo = ({ employee }: { employee: Employee }) => {
  const [t] = useTranslation();

  return (
    <Tabs>
      <TabList>
        {employeeInfoTabs.map((tab) => (
          <Tab key={tab.title}>
            {t(`enums:employee_profile_tabs.${tab.title}`)}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {employeeInfoTabs.map(({ title, panel: Panel }) => (
          <TabPanel key={title}>
            <Panel employee={employee} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
