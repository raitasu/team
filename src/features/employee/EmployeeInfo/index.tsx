import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { WorkExperienceTab } from '~/features/employee/EmployeeInfo/tabs/WorkExperienceTab';
import type { Employee } from '~/shared/store/api/employees/employees.types';

import { EducationTab } from './tabs/EducationTab';
import { PersonalInfoTab } from './tabs/PersonalInfoTab';
import { PublicationsTab } from './tabs/PublicationsTab';
import { SkillsTab } from './tabs/SkillsTab';

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
    panel: PublicationsTab
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
