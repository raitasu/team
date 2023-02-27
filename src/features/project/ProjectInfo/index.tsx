import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { AttachmentsTab } from '~/features/project/ProjectInfo/tabs/AttachmentsTab';
import { MainInformationTab } from '~/features/project/ProjectInfo/tabs/MainInformationTab';
import { SlidesTab } from '~/features/project/ProjectInfo/tabs/SlidesTab';
import { TeamManagementTab } from '~/features/project/ProjectInfo/tabs/TeamManagementTab';
import { type ProjectResponse } from '~/store/api/projects/projects.types';

const projectsInfoTabs = [
  {
    title: 'main_information' as const,
    panel: MainInformationTab
  },
  {
    title: 'attachments' as const,
    panel: AttachmentsTab
  },
  {
    title: 'team_management' as const,
    panel: TeamManagementTab
  },
  {
    title: 'slides' as const,
    panel: SlidesTab
  }
];

export const ProjectInfo = ({ project }: { project: ProjectResponse }) => {
  const { t } = useTranslation();

  return (
    <Tabs>
      <TabList>
        {projectsInfoTabs.map((tab) => (
          <Tab key={tab.title}>{t(`enums:projects_tabs.${tab.title}`)}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {projectsInfoTabs.map(({ title, panel: Panel }) => (
          <TabPanel key={title}>
            <Panel project={project} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
