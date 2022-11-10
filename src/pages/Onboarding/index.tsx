import { Box, Flex } from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';

import { OnboardingSections } from '~/pages/Onboarding/onboarding.constants';
import { OnboardingSideNav } from '~/pages/Onboarding/OnboardingSideNav';
import { AboutCompany } from '~/pages/Onboarding/sections/AboutCompany';
import { Birthdays } from '~/pages/Onboarding/sections/Birthdays';
import { Communications } from '~/pages/Onboarding/sections/Communications';
import { Contacts } from '~/pages/Onboarding/sections/Contacts';
import { Coworking } from '~/pages/Onboarding/sections/Coworking';
import { English } from '~/pages/Onboarding/sections/English';
import { Help } from '~/pages/Onboarding/sections/Help';
import { Perks } from '~/pages/Onboarding/sections/Perks';
import { ScheduleWork } from '~/pages/Onboarding/sections/ScheduleWork';
import { SickLeave } from '~/pages/Onboarding/sections/SickLeave';
import { Vacation } from '~/pages/Onboarding/sections/Vacation';
import { PagePaths } from '~/router/router.constants';
import { PageContainer } from '~/shared/layout/Page/PageContainer';

import { DiscordChats } from './sections/DiscordChats';

const isOnboardingSection = (
  routerParam: string
): routerParam is typeof OnboardingSections[keyof typeof OnboardingSections] =>
  (Object.values(OnboardingSections) as string[]).includes(routerParam);

const sections = {
  [OnboardingSections.About]: AboutCompany,
  [OnboardingSections.Discord]: DiscordChats,
  [OnboardingSections.Schedule]: ScheduleWork,
  [OnboardingSections.SickLeave]: SickLeave,
  [OnboardingSections.Vacation]: Vacation,
  [OnboardingSections.Perks]: Perks,
  [OnboardingSections.Coworking]: Coworking,
  [OnboardingSections.Help]: Help,
  [OnboardingSections.Birthdays]: Birthdays,
  [OnboardingSections.English]: English,
  [OnboardingSections.Communications]: Communications,
  [OnboardingSections.Contacts]: Contacts
};

export const Onboarding = () => {
  const { section } = useParams();

  if (!section || !isOnboardingSection(section)) {
    return (
      <Navigate to={`${PagePaths.Onboarding}/${OnboardingSections.About}`} />
    );
  }

  const Content = sections[section];

  return (
    <PageContainer>
      <Flex
        width="100%"
        gap="20px"
        height="100%"
        alignItems="top"
      >
        <OnboardingSideNav />

        <Box
          height="min-content"
          maxHeight="100%"
          border="1px solid"
          borderColor="brand.stroke"
          borderRadius="4px"
          overflow="auto"
          bg="brand.white"
        >
          <Content />
        </Box>
      </Flex>
    </PageContainer>
  );
};
