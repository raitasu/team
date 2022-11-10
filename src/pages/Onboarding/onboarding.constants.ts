import snakeCase from 'lodash/snakeCase';

import { PagePaths } from '~/router/router.constants';
import type { DashToSnakeCase } from '~/shared/helpers.types';

export const OnboardingSections = {
  About: 'about',
  Discord: 'discord',
  Schedule: 'schedule',
  SickLeave: 'sick-leave',
  Vacation: 'vacation',
  Perks: 'perks',
  Coworking: 'coworking',
  Help: 'help',
  Birthdays: 'birthdays',
  English: 'english',
  Communications: 'communications',
  Contacts: 'contacts'
} as const;

export const onboardingLinks = Object.values(OnboardingSections).map(
  (section) => ({
    target: `${PagePaths.Onboarding}/${section}`,
    translationTag: `navigation:onboarding.${
      snakeCase(section) as DashToSnakeCase<typeof section>
    }` as const
  })
);

export const hoverLinkStyles = {
  textDecoration: 'underline',
  textDecorationColor: 'brand.accentRed'
};

export const activeLinkStyles = {
  color: 'brand.accentRed'
};

export const socialLinks = [
  {
    target: 'https://cybergizer.com/',
    tag: '«Cybergizer»'
  },
  {
    target: 'https://www.linkedin.com/company/cybergizer/mycompany/',
    tag: '«LinkedIn»'
  },
  {
    target: 'https://www.instagram.com/cybergizer/',
    tag: '«Instagram»'
  }
];

export const descriptionItems = [
  {
    term: 'Cyberassist',
    definition: 'text:onboarding.discord.cyberassist'
  },
  {
    term: 'Booklovers',
    definition: 'text:onboarding.discord.booklovers'
  },
  {
    term: 'General',
    definition: 'text:onboarding.discord.general'
  },
  {
    term: 'Meetups',
    definition: 'text:onboarding.discord.meetups'
  },
  {
    term: 'Thanks',
    definition: 'text:onboarding.discord.thanks'
  },
  {
    term: 'Random',
    definition: 'text:onboarding.discord.random'
  },
  {
    term: 'Relocate',
    definition: 'text:onboarding.discord.relocate'
  },
  {
    term: 'CG-branches',
    definition: 'text:onboarding.discord.CG_branches'
  }
] as const;
