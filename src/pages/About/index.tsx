import { Flex } from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';

import { AboutSections } from '~/pages/About/about.constants';
import { AboutSideNav } from '~/pages/About/components/AboutSideNav';
import { AboutCompany } from '~/pages/About/sections/AboutCompany';
import { Birthdays } from '~/pages/About/sections/Birthdays';
import { Communications } from '~/pages/About/sections/Communications';
import { Contacts } from '~/pages/About/sections/Contacts';
import { Coworking } from '~/pages/About/sections/coworking/Coworking';
import { English } from '~/pages/About/sections/English';
import { Help } from '~/pages/About/sections/Help';
import { Perks } from '~/pages/About/sections/Perks';
import { ScheduleWork } from '~/pages/About/sections/ScheduleWork';
import { SickLeave } from '~/pages/About/sections/SickLeave';
import { Vacation } from '~/pages/About/sections/Vacation';
import { PagePaths } from '~/router/router.constants';
import { PageContainer } from '~/shared/layout/Page/PageContainer';

import { DiscordChats } from './sections/DiscordChats';
import { Memento } from './sections/Memento';

const isAboutSection = (
  routerParam: string
): routerParam is (typeof AboutSections)[keyof typeof AboutSections] =>
  (Object.values(AboutSections) as string[]).includes(routerParam);

const sections = {
  [AboutSections.About]: AboutCompany,
  [AboutSections.Discord]: DiscordChats,
  [AboutSections.Memento]: Memento,
  [AboutSections.Schedule]: ScheduleWork,
  [AboutSections.SickLeave]: SickLeave,
  [AboutSections.Vacation]: Vacation,
  [AboutSections.Perks]: Perks,
  [AboutSections.Coworking]: Coworking,
  [AboutSections.Help]: Help,
  [AboutSections.Birthdays]: Birthdays,
  [AboutSections.English]: English,
  [AboutSections.Communications]: Communications,
  [AboutSections.Contacts]: Contacts
};

export const About = () => {
  const { section } = useParams();

  if (!section || !isAboutSection(section)) {
    return <Navigate to={`${PagePaths.About}/${AboutSections.About}`} />;
  }

  const Content = sections[section];

  return (
    <PageContainer>
      <Flex
        width="100%"
        overflow="auto"
        gap="20px"
        height="100%"
        alignItems="top"
      >
        <AboutSideNav />
        <Content />
      </Flex>
    </PageContainer>
  );
};
