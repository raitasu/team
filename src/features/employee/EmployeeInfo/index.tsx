import { useMemo } from 'react';

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { CVTab } from '~/features/employee/EmployeeInfo/tabs/CVTab';
import { type Employee } from '~/store/api/employees/employees.types';

import { EducationTab } from './tabs/EducationTab';
import { PersonalInfoTab } from './tabs/PersonalInfoTab';
import { PublicationsTab } from './tabs/PublicationsTab';
import { SkillsTab } from './tabs/SkillsTab';
import { WorkExperienceTab } from './tabs/WorkExperienceTab/WorkExperienceTab';

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
    title: 'publications' as const,
    panel: PublicationsTab
  },
  {
    title: 'cv' as const,
    panel: CVTab
  }
];

const getEmployeeProfileTabs = (hasAdminAccess: boolean) =>
  hasAdminAccess
    ? employeeInfoTabs.slice()
    : employeeInfoTabs.filter(({ title }) => title !== 'cv');

export const EmployeeInfo = ({
  employee,
  hasAdminAccess,
  canEdit
}: {
  employee: Employee;
  hasAdminAccess: boolean;
  canEdit: boolean;
}) => {
  const [t] = useTranslation();

  const tabs = useMemo(
    () => getEmployeeProfileTabs(hasAdminAccess),
    [hasAdminAccess]
  );

  return (
    <Tabs>
      <TabList>
        {tabs.map((tab) => (
          <Tab key={tab.title}>
            {t(`enums:employee_profile_tabs.${tab.title}`)}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabs.map(({ title, panel: Panel }) => (
          <TabPanel key={title}>
            <Panel
              employee={employee}
              canEdit={canEdit}
            />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
